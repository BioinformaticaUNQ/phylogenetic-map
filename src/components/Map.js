import React from "react";
import geoLocationService from "../service/geoLocationService";
import { useState, useEffect } from "react";
import TargetSVG from "./TargetSVG";
import tree from '../icons/tree.svg';
import "./Map.css";

const filteredLocations = (locations) => {
  return (locations || []).reduce((res, location) => {
    const indexLocation = res.findIndex((l) => l.name === location.name);
    if (indexLocation !== -1) {
      res[
        indexLocation
      ].displaySeq = `${res[indexLocation].displaySeq}\n${location.seq}`;
      return res;
    } else {
      return [...res, { name: location.name, displaySeq: location.seq }];
    }
  }, []);
};

export default ({ locationContent, handleToogleModal }) => {
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    geoLocationService
      .findAll(filteredLocations(locationContent))
      .then((result) =>
        result.map((r) => ({ ...r, targetSVG: TargetSVG, scale: 1 }))
      )
      .then(setAllLocations);
  }, [locationContent]);

  useEffect(() => {
    const { am4core, am4maps, am4geodata_worldLow } = window;
    function am4themes_myTheme(target) {
      if (target instanceof am4maps.MapPolygon) {
        target.fill = am4core.color("#7fb5b0");
      }
    }
    am4core.useTheme(am4themes_myTheme);
    const chart = am4core.create("chartdiv", am4maps.MapChart);
    const interfaceColors = new am4core.InterfaceColorSet();
    chart.geodata = am4geodata_worldLow;

    chart.projection = new am4maps.projections.Mercator();
    chart.zoomControl = new am4maps.ZoomControl();

    chart.homeGeoPoint = { latitude: 51, longitude: -23 };

    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AQ"];
    polygonSeries.useGeodata = true;
    polygonSeries.mapPolygons.template.nonScalingStroke = true;

    const imageSeries = chart.series.push(new am4maps.MapImageSeries());
    const imageTemplate = imageSeries.mapImages.template;
    imageTemplate.tooltipText = "{name}\n{displaySeq}";
    imageTemplate.nonScaling = true;

    const marker = imageTemplate.createChild(am4core.Sprite);
    marker.path = TargetSVG;
    marker.horizontalCenter = "middle";
    marker.verticalCenter = "middle";
    marker.scale = 0.9;
    marker.fill = interfaceColors.getFor("alternativeBackground");

    imageTemplate.propertyFields.latitude = "latitude";
    imageTemplate.propertyFields.longitude = "longitude";
    imageSeries.data = allLocations;
  }, [allLocations]);

  return (
    <>
      <div id="chartdiv" className="map" />
      <div className="button-tree" onClick={() => handleToogleModal(true)}>
        <img src={tree} alt="phylogeneticTree" className="icon" />
      </div>
    </>
  );
};

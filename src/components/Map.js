import React from "react";
import { save } from "save-file";

import geoLocationService from "../service/geoLocationService";
import { useState, useEffect } from "react";
import TargetSVG from "./TargetSVG";
import tree from '../icons/tree.svg';
import "./Map.css";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const filteredLocations = (locations) => {
  return (locations || []).reduce((res, location) => {
    const indexLocation = res.findIndex((l) => l.name === location.name);
    if (indexLocation !== -1) {
      res[
        indexLocation
      ].displaySeq = `${res[indexLocation].displaySeq}\n${location.seq}`;
      res[indexLocation].amountOfSeq += 1;
      return res;
    } else {
      return [...res, { name: location.name, displaySeq: location.seq, amountOfSeq: 1 }];
    }
  }, []);
};

export default ({ filetreeName, locationContent, handleToogleModal }) => {
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    geoLocationService
      .findAll(filteredLocations(locationContent))
      .then((result) =>
        result.map((r) => ({
          ...r,
          targetSVG: TargetSVG,
          fill: getRandomColor(),
          scale: 0.5 * r.amountOfSeq,
        }))
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
    marker.propertyFields.scale = "scale";
    marker.propertyFields.fill = "fill";

    imageTemplate.propertyFields.latitude = "latitude";
    imageTemplate.propertyFields.longitude = "longitude";
    imageSeries.data = allLocations;

    chart.legend = new am4maps.Legend();

    // Legend styles
    chart.legend.paddingLeft = 10;
    chart.legend.paddingRight = 20;
    chart.legend.marginBottom = 15;
    chart.legend.width = am4core.percent(40);
    chart.legend.valign = "bottom";
    chart.legend.contentAlign = "left";

    const legends = allLocations.map((elem) => ({
      ...elem,
      name: `${elem.name} • ${elem.amountOfSeq}`,
    }));
    legends.sort((a, b) => a.amountOfSeq - b.amountOfSeq);
    chart.legend.data = legends;

    // Legend items
    chart.legend.itemContainers.template.interactionsEnabled = false;
  }, [allLocations]);

  const handleDownloadMap = () => {
    save(
      document.querySelector("#chartdiv div").innerHTML.split("<div")[0],
      `${filetreeName}.svg`
    );
  };

  return (
    <>
      <div id="chartdiv" className="map" />
      <div className="button-tree" onClick={() => handleToogleModal(true)}>
        <img src={tree} alt="phylogeneticTree" className="icon" />
      </div>
      <div className="button-dowload-map" onClick={() => handleDownloadMap()}>
        <img src={tree} alt="phylogeneticTree" className="icon" />
      </div>
    </>
  );
};

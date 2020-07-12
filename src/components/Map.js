import React from 'react';
import geoLocationService from "../service/geoLocationService";
import { useState, useEffect } from "react";
import TargetSVG from "./TargetSVG";

import "./Map.css";

const filteredLocations = (locations) => {
  return locations.reduce((res, location) => {
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
      .then((result) => result.map((r) => ({ ...r, targetSVG: TargetSVG, scale: 1 })))
      .then(setAllLocations);
  }, [locationContent]);

    return (
      <>
        <div id="chartdiv" className="map" />
        <div className="button-tree" onClick={() => handleToogleModal(true)}>
          <img src="tree.svg" alt="phylogeneticTree" />
        </div>
      </>
    );
};

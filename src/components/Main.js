import React, { useState, useEffect } from "react";
import Map from "./Map";
import Errors from './Errors';
import TreeModal from './TreeModal';

import "./Main.css";

const checkContents = (filetreeContent, locationContent) => [];

export default ({ filetreeContent, locationContent, goBack }) => {
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setErrors(checkContents(filetreeContent, locationContent))
  }, [filetreeContent, locationContent]);

  if (errors.length) return <Errors errors={errors} goBack={goBack} />

  return (
    <div className="mainContainer">
      <Map
        locationContent={locationContent}
        handleToogleModal={(b) => setShowModal(b)}
      />
      {showModal && <TreeModal filetreeContent={filetreeContent} closeModal={() => setShowModal(false)} />}
    </div>
  );
};

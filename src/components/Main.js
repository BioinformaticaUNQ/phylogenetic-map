import React, { useState, useEffect } from "react";
import Map from "./Map";
import Errors from './Errors';
import TreeModal from './TreeModal';

import "./Main.css";
import { useStoreState } from "easy-peasy";

const checkContents = (filetreeContent, locationContent) => [];

 const Main = ({ goBack }) => {
  const { treefile, locations } = useStoreState(state => state.files);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setErrors(checkContents(treefile.content, locations.content))
  }, [treefile, locations]);

  if (errors.length) return <Errors errors={errors} goBack={goBack} />

  return (
    <div className="mainContainer">
      <Map
        filetreeName={treefile.name}
        locationContent={locations.content}
        handleToogleModal={(b) => setShowModal(b)}
      />
      {showModal && (
        <TreeModal
          filetreeContent={treefile.content}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Main;

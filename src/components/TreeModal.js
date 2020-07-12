import React from "react";
import "./TreeModal.css";
import PhylogeneticTree from "./PhylogeneticTree";

export default ({ filetreeContent, closeModal }) => {
  return (
    <>
      <div className="modalBackground" onClick={closeModal} />
      <div className="modalContent">
        <PhylogeneticTree newick={filetreeContent} />
      </div>
    </>
  );
};

import React from "react";
import icon from "../icons/icon.svg";

import "./Header.css";
import { useStoreState } from "easy-peasy";

 const Header = ({ showInfo, restart }) => {
  const { treefile, locations } = useStoreState((state) => state.files);

  return (
    <header className="header">
      <div className="iconContainer" onClick={showInfo && restart}>
        <img src={icon} alt="icon" className="icon" />
        <p className="text">Phylogenetic Map!</p>
      </div>
      {showInfo && (
        <div className="files">
          <p className="text">Treefile: {treefile.name}</p>
          <p className="text">Location: {locations.name}</p>
        </div>
      )}
    </header>
  );
};

export default Header;

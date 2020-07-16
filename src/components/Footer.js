import React from "react";
import github from '../icons/github.svg';
import "./Footer.css";

export default () => {
  return (
    <footer className="footer">
      <a href="https://github.com/hurrell-y-mottesi/phylogenetic-map" className="link">
        <img src={github} alt="github" className="icon" />
      </a>
      Hurrell Tomas and Mottesi Juan
    </footer>
  );
};

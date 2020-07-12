import React from "react";
import github from '../icons/github.svg';
import "./Footer.css";

export default () => {
  return (
    <footer className="footer">
      <a href="http://www.github.com" className="link">
        <img src={github} alt="github" className="icon" />
      </a>
    </footer>
  );
};

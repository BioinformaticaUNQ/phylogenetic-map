import React from "react";
import "./Errors.css";

export default ({ errors }) => {
  return <div className="errors">
    { errors }  
  </div>;
};

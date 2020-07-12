import React, { useState, useRef } from "react";
import "./Form.css";

export default ({ setFiletreeContent, setLocationContent, generateMap }) => {
  const [treefile, setTreefile] = useState("");
  const [locationfile, setLocationfile] = useState("");

  const treeFileInputRef = useRef(null);
  const locationFileInputRef = useRef(null);

  const handleFileSelected = (file, setName, setContent) => {
    setName(file.name);
    const fileReader = new FileReader();
    fileReader.onload = (e) => setContent(file.name, e.target.result);
    fileReader.readAsText(file);
  };

  const handleTreefile = (e) =>
    handleFileSelected(e.target.files[0], setTreefile, setFiletreeContent);
  const handleLocationFile = (e) =>
    handleFileSelected(e.target.files[0], setLocationfile, setLocationContent);

  return (
    <div className="form">
      <div className={`formRow ${treefile && "selectedFile"}`}>
        <label htmlFor="treefile" className="label">
          Treefile: {treefile || "Select file"}
        </label>
        <span
          htmlFor="treefile"
          className="btn btnUpload"
          onClick={() => treeFileInputRef.current.click()}
        >
          Upload
        </span>
        <input
          id="treefile"
          type="file"
          ref={treeFileInputRef}
          className="inputFile"
          accept=".treefile"
          onChange={handleTreefile}
        />
      </div>
      <div className={`formRow ${locationfile && "selectedFile"}`}>
        <label htmlFor="locationfile" className="label">
          Treefile: {locationfile || "Select file"}
        </label>
        <span
          htmlFor="locationfile"
          className="btn btnUpload"
          onClick={() => locationFileInputRef.current.click()}
        >
          Upload
        </span>
        <input
          id="locationfile"
          type="file"
          className="inputFile"
          accept=".json"
          ref={locationFileInputRef}
          onChange={handleLocationFile}
        />
      </div>
      <span className="btn btnPrimary" onClick={generateMap}>
        Generate Map
      </span>
    </div>
  );
};

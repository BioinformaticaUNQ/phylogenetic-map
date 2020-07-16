import React, { useRef } from "react";

const Input = ({ value, label, placeholder = "Select file", htmlFor, accept, onChange }) => {

  const inputRef = useRef(null);

  return (
    <div className={`formRow ${value && "selectedFile"}`}>
      <label htmlFor={htmlFor} className="label">
        {label}: {value || placeholder}
      </label>
      <span
        htmlFor={htmlFor}
        className="btn btnUpload"
        onClick={() => inputRef.current && inputRef.current.click()}
      >
        Upload
      </span>
      <input
        id={htmlFor}
        type="file"
        ref={inputRef}
        className="inputFile"
        accept={accept}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;

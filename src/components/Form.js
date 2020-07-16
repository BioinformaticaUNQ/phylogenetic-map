import React from "react";
import "./Form.css";
import Input from "./Input";
import { useStoreState, useStoreActions } from "easy-peasy";

const Form = ({ generateMap }) => {
  const { treefile, locations } = useStoreState(state => state.files);
  const { addTreefile, addLocations } = useStoreActions(actions => actions.files)


  const handleFileSelected = update => event => {
    if (event.target.files.length) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e) => update({ name: file.name, content: e.target.result});
      fileReader.readAsText(file);
    }
  };

  const handleTreefile = handleFileSelected(addTreefile);
  const handleLocationFile = handleFileSelected(addLocations);

  return (
    <div className="form">
      <Input
        value={treefile.name}
        htmlFor="treefile"
        label="Treefile"
        onChange={handleTreefile}
        accept=".treefile"
      />
      <Input
        value={locations.name}
        htmlFor="location"
        label="Location"
        onChange={handleLocationFile}
        accept=".json"
      />
      <span className="btn btnPrimary" onClick={generateMap}>
        Generate Map
      </span>
    </div>
  );
};

export default Form;

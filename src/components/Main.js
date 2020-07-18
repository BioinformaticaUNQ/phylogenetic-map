import React, { useState } from "react";
import { useStoreState } from "easy-peasy";
import Map from "./Map";
import TreeModal from "./TreeModal";

import "./Main.css";

const Main = () => {
  const { treefile, locations } = useStoreState((state) => state.files);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mainContainer">
      <Map
        filetreeName={treefile.name}
        locationContent={JSON.parse(locations.content)}
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

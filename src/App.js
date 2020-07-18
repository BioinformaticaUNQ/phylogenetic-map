import React, { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import newickJs from "biojs-io-newick";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import difference from "lodash/difference";
import isEmpty from "lodash/isEmpty";
import Header from "./components/Header";
import Main from "./components/Main";
import Form from "./components/Form";
import Footer from "./components/Footer";

import "./App.css";

const showError = (fileName) =>
  NotificationManager.error(
    [
      `${fileName} format is incorrect`,
      <a
        className="link"
        href="https://github.com/hurrell-y-mottesi/phylogenetic-map"
        target="_blank"
        rel="noopener noreferrer"
      >
        Show Doc
      </a>,
    ],
    "",
    500000
  );

function App() {
  const { treefile, locations } = useStoreState((state) => state.files);
  const cleanFiles = useStoreActions((actions) => actions.files.cleanFiles);
  const [showMap, setShowMap] = useState(false);

  const restart = () => {
    cleanFiles();
    setShowMap(false);
  };

  const containsInvalidKeys = (content) => {
    return content.some((c) => difference(Object.keys(c), ["seq", "name"]).length !== 0);
  };

  const checkContents = () => {
    const treefileContent = newickJs.parse_newick(treefile.content);
    if (isEmpty(treefileContent)) {
      showError(treefile.name);
      return;
    }    
    try {
      const locationContent = JSON.parse(locations.content);
      if (!(locationContent instanceof Array) || containsInvalidKeys(locationContent)) {
        showError(locations.name);
      } else {
        setShowMap(true);
      }
    } catch (e) {
      showError(locations.name);
    }
  };

  return (
    <>
      <section className="container">
        <Header showInfo={showMap} restart={restart} />
        {showMap ? (
          <Main goBack={() => setShowMap(false)} />
        ) : (
          <Form generateMap={checkContents} />
        )}
        <Footer />
      </section>
      <NotificationContainer />
    </>
  );
}

export default App;

import React, { useState } from "react";
import { useStoreActions } from "easy-peasy";

import Header from "./components/Header";
import Main from "./components/Main";
import Form from "./components/Form";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [showMap, setShowMap] = useState(false);
  const cleanFiles = useStoreActions((actions) => actions.files.cleanFiles);

  const restart = () => {
    cleanFiles();
    setShowMap(false);
  };

  return (
    <section className="container">
      <Header showInfo={showMap} restart={restart} />
      {showMap ? (
        <Main goBack={() => setShowMap(false)} />
      ) : (
        <Form generateMap={() => setShowMap(true)} />
      )}
      <Footer />
    </section>
  );
}

export default App;

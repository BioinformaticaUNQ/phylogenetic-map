import React, { useReducer, useState } from 'react';

import reducer, { initialState} from './reducer/Reducer';
import Header from './components/Header';
import Main from './components/Main';
import Form from './components/Form';
import Footer from './components/Footer';

import './App.css';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showMap, setShowMap] = useState(false);

  const setFiletreeContent = (fileName, content) =>
    dispatch({ type: "SET_FILETREE_CONTENT", payload: { fileName, content } });
  const setLocationContent = (fileName, content) =>
    dispatch({ type: "SET_LOCATION_CONTENT", payload: { fileName, content } });
  const cleanFiles = () => {
    dispatch({ type: "CLEAN_FILES" });
    setShowMap(false);
  };

  return (
    <section className="container">
      <Header
        filetreeName={state.filetreeFileName}
        locationName={state.locationFileName}
        showInfo={showMap}
        cleanFiles={cleanFiles}
      />
      {showMap ? (
        <Main
          filetreeName={state.filetreeFileName}
          filetreeContent={state.filetreeContent}
          locationContent={state.locationContent}
          goBack={() => setShowMap(false)}
        />
      ) : (
        <Form
          setFiletreeContent={setFiletreeContent}
          setLocationContent={setLocationContent}
          generateMap={() => setShowMap(true)}
        />
      )}
      <Footer />
    </section>
  );
}

export default App;

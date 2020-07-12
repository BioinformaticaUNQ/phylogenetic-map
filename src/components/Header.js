import React from 'react';
import './Header.css';

export default ({ filetreeName, locationName, showInfo, cleanFiles }) => {
    return (
      <header className="header">
        <div className="iconContainer" onClick={cleanFiles}>
          <img src="icon.svg" alt="icon" className="icon" />
          <p className="text">Phylogenetic Map!</p>
        </div>
        {showInfo && (
          <div className="files">
            <p className="text">Treefile: {filetreeName}</p>
            <p className="text">Location: {locationName}</p>
          </div>
        )}
      </header>
    );
}

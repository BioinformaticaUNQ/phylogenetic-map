import React, { useEffect, useRef } from "react";
import newickJs from "biojs-io-newick";
import Tree from "react-tree-graph";
import "react-tree-graph/dist/style.css";
import svgPanZoom from "svg-pan-zoom";

import "./PhylogeneticTree.css";

const formatNodes = (graph) => {
  graph.children.forEach((node, index) => {
    if (node.name) {
      const splitName = node.name.match("gi_(.*)_.*_(.*)_");
      if (!splitName) {
        node.gi = node.name;
        node.gb = node.name;
      } else {
        node.gi = `Gi: ${splitName[1]}`;
        node.gb = splitName[2];
      }
    }
    node.displayName = node.name ? node.gi : node.branch_length;
    node.key = `${index}-${node.displayName}`;
    if (node.children) formatNodes(node);
  });
};

function PhylogeneticTree({ newick }) {
  const data = newickJs.parse_newick(newick);
  const treeRef = useRef(null);

  formatNodes(data);

  useEffect(() => {
    if (treeRef.current) {
      const svg = document.querySelector("#phylogeneticTreeContainer svg");
      svgPanZoom(svg, { dblClickZoomEnabled: false });
    }
  }, [treeRef]);

  return (
    <div className="phylogeneticTreeContainer" id="phylogeneticTreeContainer">
      <Tree
        ref={treeRef}
        data={data}
        height={2000}
        width={2000}
        labelProp="displayName"
        keyProp="key"
      />
    </div>
  );
}

export default PhylogeneticTree;

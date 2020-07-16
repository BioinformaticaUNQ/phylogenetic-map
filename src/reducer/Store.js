import { createStore, action } from "easy-peasy";

const store = createStore({
  files: {
    treefile: {
      name: "",
      content: "",
    },
    locations: {
      name: "",
      content: "",
    },
    addTreefile: action((state,payload) => {
      state.treefile = { ...payload };
    }),
    addLocations: action((state, { name, content }) => {
      state.locations = { name, content: JSON.parse(content) };
    }),
    cleanFiles: action((state) => {
      state.treefile = { name: "", content: "" };
      state.locations = { name: "", content: "" };
    })
  },
});

export default store;

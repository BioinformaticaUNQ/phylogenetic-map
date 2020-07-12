import axios from "axios";

const apiKey = "b4ec1cf9ef564381871d4386e2133a63";

export default {
  findAll: (locations) => {
    return Promise.all(
      locations.map((l) =>
        axios
          .get(
            `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${l.name}`
          )
          .then((result) => result.data)
          .then((result) => {
            const {
              lat: latitude,
              lng: longitude,
            } = result.results[0].geometry;
            return { ...l, latitude, longitude };
          })
      )
    );
  },
};

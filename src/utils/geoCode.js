const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWJoaXNhcGhpeWE5NSIsImEiOiJja3p6ZTFtYTYwMDRtM2NzNXpucm1jenM4In0.dzGEfnCpyv-DL2znTWQy2g";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Connection error! Please Check your connection!", undefined);
    } else if (body.features.length === 0) {
      callback("Unknown location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;

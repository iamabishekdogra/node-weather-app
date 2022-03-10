const request = require("request");

const forcast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=4892ed90ea06a6d37099a3414973bbd7&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("No network connection!", undefined);
    } else if (body.error) {
      callback("No location found", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degree out. But it feel like ${body.current.feelslike} degree and cloud cover percentages is ${body.current.cloudcover} % `
      );
    }
  });
};

module.exports = forcast;

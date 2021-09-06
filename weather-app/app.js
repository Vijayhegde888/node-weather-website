const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const address = process.argv[2];

if (!address) {
  console.log("Enter your location");
} else {
  geocode(address, (error, {latitude,longitude,location}) => {
    if (error) {
      return console.log("error", error);
    } else {
      forecast(latitude,longitude, (error, forecastData) => {
        if (error) {
          return console.log("Error", error);
        }
        console.log(location);
        console.log(forecastData);
      });
    }
  });
}

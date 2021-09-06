const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmlqYXloZWdkZSIsImEiOiJja3N5dWU2OTkybjJ6MnVtZHc3MWNmNXRsIn0.dseGCQWUV0Y9O1ad3CWUMQ&limit=1`;

  request({ url, json: true }, (error, {body}={}) => {
    if (error) {
      callback("Unable to coonect to web service",undefined);
    } else if (body.features.length === 0) {
      callback(
        "inavlid request unable to fetch data,try with different term",undefined
      );
    } else {
      // const latitude=response.body.features[0].center[1]
      // const longitude=response.body.features[0].center[0]
      // console.log(`latitude is ${latitude} and longitude is ${longitude}`);
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
        // console.log(`latitude is ${latitude} and longitude is ${longitude}`);
      });
    }
  });
};


module.exports = geocode;



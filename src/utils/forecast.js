const request = require("postman-request");

const forecast= (latitude,longitude,callback)=>{
    const url =
      `http://api.weatherstack.com/current?access_key=2f196ff489cb085459da67f3531dd27f&query=${latitude},${longitude}`;

      request({ url, json: true }, function (error, {body}) {
        //   console.log(response);
          if (error) {
            callback("Unable to coonect to web service",undefined);
          } else if (body.error) {
            callback("invalid input ",undefined);
          } else {
            callback(undefined,
                `${body.current.weather_descriptions}..temperature is ${body.current.temperature} degree out and likely ${body.current.precip} % chance of rain `
            // summary: res.body.daily.data[0].summary,
            // temperature: res.body.currently.temperature,
            // percipitation: res.body.currently.precipProbability * 100 
            );
          }
        });
    }
    module.exports=forecast
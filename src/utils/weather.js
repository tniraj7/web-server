const request = require("request");
const math = require("mathjs");

const getWeather = (url, city = "city", key, callback) => {
  const URL = url + `q=${city}` + `&appid=${key}`;

  request(
    {
      url: URL,
      json: true
    },
    (error, response) => {
      if (error) {
        callback("Unable to connect to the weather service", undefined);
      } else if (response.body.cod !== 200) {
        callback(
          {
            code: response.body.cod,
            message: response.body.message
          },
          undefined
        );
      } else {
        callback(undefined, {
          city: response.body.name,
          minTemp: math.round(response.body.main.temp_min - 273.15),
          maxTemp: math.round(response.body.main.temp_max - 273.15),
          windSpeed: response.body.wind.speed
        });
      }
    }
  );
};

module.exports = {
  getWeather
};

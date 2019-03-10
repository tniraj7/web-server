const request = require("request")
const math = require('mathjs')

const getWeather = (url, city = "city", key) => {
  var URL = url + `q=${city}` + `&appid=${key}`;

  return new Promise((resolve, reject) => {
    request(
      {
        url: URL,
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject(error);
        } else if (response) {
          if (response.statusCode === 200) {
            resolve({
              maxTemp: math.round(body.main.temp_max - 273.15),
              minTemp: math.round(body.main.temp_min - 273.15)
            });
          }
        }
      }
    );
  });
};

module.exports = {
  getWeather
};

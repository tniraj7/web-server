const express = require("express");
const hbs = require("hbs");
const path = require("path");
const utils = require("./utils/weather");

//Paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";
const API_KEY = "1bf7b4bd00bd3c84b2ca2d73fa0ddcd3";

const app = express();

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Niraj"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Niraj"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "How may I help you ?",
    title: "Help",
    name: "Niraj"
  });
});

app.get("/help/*", (req, res) => {
  res.render("error404", {
    errorType: "404",
    errorMessage: "Help article Not Found",
    name: "Niraj"
  });
});

const port = process.env.PORT || 3000
  
app.get("/", (req, res) => {
  res.send("<h1>Weather</h1>");
});

app.get("/weather", (req, res) => {
  if (!req.query.city) {
    return res.send({
      error: "You must provide with the city name"
    });
  }

  utils.getWeather(BASE_URL, req.query.city, API_KEY, (error, data) => {
    if (error) {
      res.send({
        error
      });
    } else {
      return res.send({
        city: data.city,
        maxTemp: `${data.maxTemp} °C`,
        minTemp: `${data.minTemp} °C`,
        windspeed: `${data.windSpeed} m/s`
      });
    }
  });
});

app.get("*", (req, res) => {
  res.render("error404", {
    errorType: "404",
    errorMessage: "Page Not Found",
    name: "Niraj"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

require("dotenv").config();
const express = require("express");
const db = require("./src/Config/Database");
const WeatherController = require("./src/Controllers/Weather.js");
const NewsController = require("./src/Controllers/News.js");
const CountryController = require("./src/Controllers/Country.js");

//Import express
const app = express();

//Middleware
app.use(express.json());

app.get("/api/weather/:action", async (req, res, next) => {
  const { action } = req.params;

  try {
    const weatherControllerInstance = new WeatherController();

    // Check if the action exists in the controller
    if (typeof weatherControllerInstance[action] !== "function") {
      return res.status(404).send("Action not found");
    }

    // Call the action
    await weatherControllerInstance[action](req, res);
  } catch (err) {
    if (err.code === "MODULE_NOT_FOUND") {
      return res.status(404).send("Action not found");
    }
    next(err); // Forward other errors to the error handler
  }
});

app.get("/api/news/:action", async (req, res, next) => {
  const { action } = req.params;

  try {
    const newsControllerInstance = new NewsController();

    // Check if the action exists in the controller
    if (typeof newsControllerInstance[action] !== "function") {
      return res.status(404).send("Action not found");
    }

    // Call the action
    await newsControllerInstance[action](req, res);
  } catch (err) {
    if (err.code === "MODULE_NOT_FOUND") {
      return res.status(404).send("Action not found");
    }
    next(err); // Forward other errors to the error handler
  }
});

app.get("/api/country/:action", async (req, res, next) => {
  const { action } = req.params;

  try {
    const countryControllerInstance = new CountryController();

    // Check if the action exists in the controller
    if (typeof countryControllerInstance[action] !== "function") {
      return res.status(404).send("Action not found");
    }

    // Call the action
    await countryControllerInstance[action](req, res);
  } catch (err) {
    if (err.code === "MODULE_NOT_FOUND") {
      return res.status(404).send("Action not found");
    }
    next(err); // Forward other errors to the error handler
  }
});

//connection to Database
db(process.env.MONGO_DB_URI);

//Server initialization
const PORT = process.env.API_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server start in port ${PORT}`);
});

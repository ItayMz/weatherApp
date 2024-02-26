const express = require("express");
const router = express.Router();
const { getData } = require("../controllers/forecastController");


  router.get("/:cityName", getData)


module.exports = router;

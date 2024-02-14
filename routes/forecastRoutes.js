const express = require("express");
const router = express.Router();
const {
  getAllForecasts,
  getForecast,
  createForecast,
  deleteForecast,
  updateForecast,
  getForecastsByCityName,
} = require("../controllers/forecastController");
router.route("/").get(getAllForecasts).post(createForecast);


router
  .route("/:id")
  .get(getForecast)
  .patch(updateForecast)
  .delete(deleteForecast);

  router.get("/city/:cityName", getForecastsByCityName)



module.exports = router;

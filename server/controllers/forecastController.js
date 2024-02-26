const { calculateWindDirection } = require("../utils/calculateWindDir");
const catchAsync = require("../utils/catchAsync");
const { fetchForecastData } = require("../utils/fetchForecastData");
module.exports = {
  getData: catchAsync(async function (req, res, next) {
    const { cityName } = req.params;
    if (!cityName) return;
    const data = await fetchForecastData(cityName);
    const forecasts = data.list.map((forecast) => {
      return {
        date: new Date(forecast.dt_txt),
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        precipitation: forecast.pop || 0, // pop might not be always available
        windSpeed: forecast.wind.speed,
        windDirection: calculateWindDirection(forecast.wind.deg),
        humidity: forecast.main.humidity,
        description: forecast.weather[0].description
      };
    });

    res.status(200).json({
      status: "success",
      forecasts,
    });
  }),
};

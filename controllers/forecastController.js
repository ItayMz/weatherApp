const Forecast = require("../models/forecastModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
module.exports = {
  createForecast: catchAsync(async function (req, res, next) {
    const forecast = await Forecast.create(req.body);

    res.status(201).json({
      status: "success",
      forecast,
    });
  }),
  getForecast: catchAsync(async function (req, res, next) {
    const forecast = await Forecast.findById(req.params.id);
    if (!forecast)
      return next(new AppError("No forecast found with that ID", 404));
    res.status(200).json({
      status: "success",
      forecast,
    });
  }),
  getAllForecasts: catchAsync(async function (req, res, next) {
    const forecasts = await Forecast.find();
    res.status(200).json({
      status: "success",
      results: forecasts.length,
      forecasts,
    });
  }),
  updateForecast: catchAsync(async function (req, res, next) {
    const forecast = await Forecast.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!forecast)
      return next(new AppError("No forecast found with that ID", 404));

    res.status(200).json({
      status: "success",
      forecast,
    });
  }),
  deleteForecast: catchAsync(async function (req, res, next) {
    const forecast = await Forecast.findByIdAndDelete(req.params.id);
    if (!forecast)
      return next(new AppError("No forecast found with that ID", 404));

    res.status(204).json({
      status: "success",
    });
  }),
  getForecastsByCityName: catchAsync(async function(req,res,next){
    const cityName = req.params.cityName;
    const forecasts = await Forecast.find();
   // Filter out forecasts that don't match the specified city name
   const filteredForecasts = forecasts.filter(forecast => forecast.city.name === cityName);
   

   res.status(200).json({
       status: 'success',
       results: filteredForecasts.length,
       forecasts: filteredForecasts
   });
  })
};

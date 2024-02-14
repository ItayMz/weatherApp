const City = require("../models/cityModel");
const AppError = require("../utils/AppError");
const catchAsync = require('../utils/catchAsync')
module.exports = {
  createCity: catchAsync(async function (req, res, next) {
    const city = await City.create(req.body);
    
    res.status(201).
      json({
        status: "success",
        city,
      });
  }),
  getCity: catchAsync(async function (req, res, next) {
    const city = await City.findById(req.params.id);
    if (!city) return next(new AppError('No city found with that ID', 404));
    res.status(200).json({
      status: "success",
      city,
    });
  }),
  getAllCities: catchAsync(async function (req, res, next) {
    const cities = await City.find();
    res.status(200).json({
      status: "success",
      results:cities.length,
      cities,
    });
  }),
  updateCity: catchAsync(async function (req, res, next) {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!city) return next(new AppError('No city found with that ID', 404));

    res.status(200).json({
        status: 'success',
        city
    })
  }),
  deleteCity: catchAsync(async function (req,res,next){
    const city = await City.findByIdAndDelete(req.params.id)
    if (!city) return next(new AppError('No city found with that ID', 404));

    res.status(204).json({
        status: 'success'
    })
  })
};

const mongoose = require('mongoose');
const City = require('./cityModel')
const forecastSchema = new mongoose.Schema({
    city: {
        type: mongoose.Types.ObjectId,
        ref: 'City',
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    minTemperature: Number,
    maxTemperature: Number,
    percipitationProbability: Number,
    windSpeed: Number,
    windDirection:{
        type: String,
        enum: ['N', 'E', 'S', 'W', 'NE', 'SE', 'SW', 'NW']
    },
    humidity: Number,
    createdAt:{
        type: Date,
        default: Date.now()
    }

})

forecastSchema.pre('save', async function(next){
     // Update the corresponding city document
     await City.findByIdAndUpdate(
        this.city, // Assuming cityId is provided in the request body
        { $push: { forecasts: this._id } }, // Push the forecast ID to the forecasts array
        { new: true, runValidators: true } // To return the updated city document
    );
    next()
})

forecastSchema.pre(/^find/, function(next){
    this.populate({path: "city", select: "-forecasts"})
    next()
})

const Forecast = mongoose.model('Forecast', forecastSchema);
module.exports = Forecast;
const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a city name"],
        unique: true
    },
    country: String,
    latitude: {
        type: Number,
        required: [true, "Please provide the latitude"]
    },
    longitude: {
        type: Number,
        required: [true, "Please provide the longitude"]
    },
    forecasts: [{ type: mongoose.Types.ObjectId, ref: 'Forecast' }],
})


const City = mongoose.model('City', citySchema);
module.exports = City;
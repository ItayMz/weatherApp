const AppError = require("./AppError");

 async function fetchForecastData(cityName) {
  try {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
    
  } catch (err) {
    return new AppError(err.message, 500);
  }
}

module.exports = {fetchForecastData};

const express = require("express");
const AppError = require("./utils/appError");
const cityRouter = require("./routes/cityRoutes");
const forecastRouter = require("./routes/forecastRoutes");
const app = express();

app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.json({ limit: "10kb" })); //When the req.body is greater than 10kb, the request will not be sent

app.use("/api/v1/cities", cityRouter);
app.use("/api/v1/forecasts", forecastRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;

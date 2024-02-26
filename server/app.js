const express = require("express");
const AppError = require("./utils/appError");
const rateLimit = require("express-rate-limit");
const forecastRouter = require("./routes/forecastRoutes");
const xss = require("xss-clean");
const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.json({ limit: "10kb" })); //When the req.body is greater than 10kb, the request will not be sent
//Data sanitization against XSS
app.use(xss());

//Implement CORS
app.use(cors());

app.options('*', cors());

//Limits requests from same API
const limiter = rateLimit({
  windowMs: 60 * 60 * 500, //Limiting 50 requests per hour
  max: 100,
  message: "Too many requests from this IP, please try again in an hour",
});
app.use("/api", limiter);

app.use("/api/v1/forecasts", forecastRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});



module.exports = app;

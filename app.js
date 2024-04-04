const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require('dotenv').config({ path: `.env` });

const { connectDatabase } = require("./config");
const routes = require("./routes");

// connect to database
connectDatabase();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true, }));
app.use(express.static(path.join(__dirname, "public")));

// import routes
app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render("error");

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  // console.error(err.stack);
  console.error(message);
  res.status(status).json({
    error: {
      status: status,
      message: message,
    },
  });
  next();
});

module.exports = app;

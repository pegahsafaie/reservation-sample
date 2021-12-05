const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apiRouter = require('./routes/index');
const app = express();
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', cors(corsOptions), apiRouter);
app.use('/public-api', cors(), apiRouter);

// middleware for all requests: catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// middleware for all requests: error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;

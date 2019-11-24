"use strict";
const { statsController: invoiceController } = require("../controllers/index");
const logger = require("../../libs/logger");

const apiPrefix = "/api";

const createCustomResponse = (res, status, body) => {
  res.status(status).send({ message: body });
};

const respondWithMethodNotAllowed = (req, res) => {
  return createCustomResponse(res, 405, "Method Not Allowed");
};

module.exports = app => {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  // error handler
  // no stacktraces leaked to user unless in development environment
  app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(err.status || 500).send({
      status: "error",
      message: err.message,
      error: process.env.NODE_ENV === "production" ? {} : err.stack
    });
  });
};

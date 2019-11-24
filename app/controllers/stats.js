"use strict";
const { statsService } = require("../services/index");
const logger = require("../../libs/logger");

module.exports = {
  getRentalStatsNaive(req, res, next) {
    return statsService
      .getRentalStatsNaive()
      .then(stats => {
        if (!stats) {
          const msg = `Cannot find stats!`;
          logger.warn(msg);
          res.status(400).send({ message: msg });
        } else {
          res.status(200).send(stats);
        }
      })
      .catch(next);
  },

  getRentalStatsImproved(req, res, next) {
    return statsService
      .getRentalStatsImproved()
      .then(stats => {
        if (!stats) {
          const msg = `Cannot find stats!`;
          logger.warn(msg);
          res.status(400).send({ message: msg });
        } else {
          res.status(200).send(stats);
        }
      })
      .catch(next);
  },

  getRentalStatsOptimized(req, res, next) {
    return statsService
      .getRentalStatsOptimized()
      .then(stats => {
        if (!stats) {
          const msg = `Cannot find stats!`;
          logger.warn(msg);
          res.status(400).send({ message: msg });
        } else {
          res.status(200).send(stats);
        }
      })
      .catch(next);
  },
  getDetailedStatistics(req, res, next) {
    return statsService
      .getDetailedStatistics()
      .then(stats => {
        res.status(200).send(stats);
      })
      .catch(next);
  }
};

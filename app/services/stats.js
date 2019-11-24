"use strict";
const { statsGateway } = require("../gateways/index");

module.exports = {
  getRentalStatsNaive() {
    return statsGateway.getRentalStatsNaive();
  }
};

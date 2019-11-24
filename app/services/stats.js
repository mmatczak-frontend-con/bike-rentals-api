"use strict";
const { statsGateway } = require("../gateways/index");

module.exports = {
  getRentalStatsNaive() {
    return statsGateway.getRentalStatsNaive();
  },

  getRentalStatsImproved() {
    return statsGateway.getRentalStatsImproved();
  },

  getRentalStatsOptimized() {
    return statsGateway.getRentalStatsOptimized();
  },

  getDetailedStatistics() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ stats: "Very detailed statistics" });
      }, 5000);
    });
  }
};

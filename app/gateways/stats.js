"use strict";
const rp = require("request-promise");
const fs = require("fs");

const naiveApiEndpoint =
  'https://www.wroclaw.pl/open-data/api/action/datastore_search_sql?sql=SELECT * from "276306b4-9ab7-4036-a7e3-ee7af3b485d5" WHERE "Numer roweru" in (57638,57332)';

const optimizedApiEndpoint =
  'https://www.wroclaw.pl/open-data/api/action/datastore_search_sql?sql=SELECT "Numer roweru" as bikeId, Date("Data wynajmu") as rentStartDate, count(*) from "276306b4-9ab7-4036-a7e3-ee7af3b485d5" WHERE "Numer roweru" in (57638,57332) group by "Numer roweru", Date("Data wynajmu")';

const getDistinctBikeEndpoint =
  'https://www.wroclaw.pl/open-data/api/action/datastore_search_sql?sql=SELECT distinct "Numer roweru" as bikeId from "276306b4-9ab7-4036-a7e3-ee7af3b485d5" WHERE "Numer roweru" in (57638,57332)';

const getEndpointWithStatsForBike = bikeId => `
https://www.wroclaw.pl/open-data/api/action/datastore_search_sql?sql=SELECT Date("Data wynajmu") as date, count(*) from "276306b4-9ab7-4036-a7e3-ee7af3b485d5" WHERE "Numer roweru" = ${bikeId} group by Date("Data wynajmu")`;

const bikeIdPropertyName = "Numer roweru";
const rentStartDatePropertyName = "Data wynajmu";

module.exports = {
  getRentalStatsNaive() {
    return rp
      .get(naiveApiEndpoint)
      .then(getResultsFromResponse)
      .then(statsArray =>
        statsArray.map(singleStat => {
          return {
            bikeId: singleStat[bikeIdPropertyName],
            rentStartDate: singleStat[rentStartDatePropertyName].substr(0, 10)
          };
        })
      );
  },

  getRentalStatsImproved() {
    return this.getRentalStatsNaive()
      .then(stats => groupByCount(stats, "bikeId", "rentStartDate"))
      .then(stats => {
        return Object.keys(stats).map(bikeId => {
          const dailyStats = Object.keys(stats[bikeId]).map(date => {
            return { date: date, count: stats[bikeId][date] };
          });
          return { bikeId, dailyStats };
        });
      });
  }
};

const getResultsFromResponse = response => JSON.parse(response).result.records;

const groupByCount = (objectArray, groupByProperty1, groupByProperty2) => {
  return objectArray.reduce(function(acc, obj) {
    var key1 = obj[groupByProperty1];
    var key2 = obj[groupByProperty2];
    if (!acc[key1]) {
      acc[key1] = {};
    }
    if (!acc[key1][key2]) {
      acc[key1][key2] = 0;
    }
    acc[key1][key2]++;
    return acc;
  }, {});
};

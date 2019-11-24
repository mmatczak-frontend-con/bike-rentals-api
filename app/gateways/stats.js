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

module.exports = {};

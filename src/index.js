"use strict";
const parseListings = require("./parse");
const getListings = require("./data");
const searchListings = require("./search");
const utils = require("./utils");

module.exports = async function searchStock(url, terms) {
  const allListings = await getListings(url);
  return parseAndSearchListings(allListings, terms);
};

function parseAndSearchListings(listings, terms) {
  const parsedListings = parseListings(listings);
  return searchListings(formatTerms(terms), formatListings(parsedListings));
}

function formatTerms(terms) {
  return utils.lowerCaseAllElements(terms.split(" "));
}

function formatListings(listings) {
  return utils.lowerCaseAllElements(listings);
}

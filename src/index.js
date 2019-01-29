const parseListings = require("./parse");
const getListings = require("./data");
const searchListings = require("./search");
const utils = require("./utils");

const { lowerCaseAllElements } = utils;

module.exports = async function searchStock(url, terms) {
  const allListings = await getListings(url);
  return parseAndSearchListings(allListings, terms);
};

function parseAndSearchListings(listings, termsString) {
  const parsedListings = parseListings(listings);
  const terms = termsString.split(" ");
  // searchListings only works with lower cased strings
  const formattedListings = lowerCaseAllElements(parsedListings);
  const formattedTerms = lowerCaseAllElements(terms);

  return searchListings(formattedTerms, formattedListings);
}

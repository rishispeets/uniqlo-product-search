"use strict";
const parseListings = require("./src/parse");
const getListings = require("./src/data");

const URL = "https://www.uniqlo.com/eu/en_NL/men/outerwear/coats-jackets";
const SEARCH_TERMS = ["wool", "chesterfield", "coat"];

module.exports = { checkStock };

async function checkStock(event) {
  const potentialHits = await searchStock({ url: URL, terms: SEARCH_TERMS });
  console.log(`Hits: ${potentialHits}`);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "haha",
      input: event
    })
  };
}

async function searchStock({ url, terms }) {
  const allListings = await getListings(url);
  const listingTags = parseTags();
  const searchMatches = searchStock(listingTags);

  return parseListings(allListings);
}

"use strict";
const parseListings = require("./src/parse");
const getListings = require("./src/data");

const URL = "https://www.uniqlo.com/eu/en_NL/men/outerwear/coats-jackets";
const SEARCH_TERMS = ["wool", "chesterfield", "coat"];

module.exports = checkStock;

async function checkStock(event) {
  const allListings = await getListings(URL);
  const parsedHtml = parseListings(allListings);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "haha",
      input: event
    })
  };
}

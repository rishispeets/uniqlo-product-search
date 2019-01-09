"use strict";
const axios = require("axios");
const parseListings = require("./parser");

const URL = "https://www.uniqlo.com/eu/en_NL/men/outerwear/coats-jackets";
const SEARCH_TERMS = ["wool", "chesterfield", "coat"];

async function checkStock(event, context, cb) {
  const html = await getHtml(URL);
  const parsedHtml = parseListings(html);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "haha",
      input: event
    })
  };
}

async function getHtml(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  checkStock,
  getHtml
};

"use strict";
const axios = require("axios");

async function checkStock(event, context, cb) {
  const html = await getHtml(
    "https://www.uniqlo.com/eu/en_NL/men/outerwear/coats-jackets"
  );
  const parsedHtml = parseHtml(html);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: result,
      input: event
    })
  };
}

async function getHtml(url) {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error(error);
  }
}

function parseHtml() {}

module.exports = {
  checkStock,
  getHtml
};

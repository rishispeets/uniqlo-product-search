"use strict";
const axios = require("axios");
const htmlparser = require("htmlparser2");

const URL = "https://www.uniqlo.com/eu/en_NL/men/outerwear/coats-jackets";
const SEARCH_TERMS = ["wool", "chesterfield", "coat"];

async function checkStock(event, context, cb) {
  const html = await getHtml(URL);
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
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function parseHtml(html) {
  const parser = createParser();
  parser.write(html);
}

function createParser() {
  return new htmlparser.Parser({
    onopentag: (name, attribs) => {
      if (name === "a" && attribs.title) {
        console.log(`Example of a title: ${attribs.title}`);
      }
    }
  });
}

function collectAndFilterTitles() {}
function isValidTitle(title) {
  return isAllCaps(title) && !isSingleWord(title);
}
function isAllCaps() {}
function isSingleWord() {}
function isATag() {}

module.exports = {
  checkStock,
  getHtml
};

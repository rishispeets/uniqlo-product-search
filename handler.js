const searchStock = require("./src/index");

const URL = "https://www.uniqlo.com/eu/en_NL/men/outerwear/coats-jackets";
const SEARCH_TERMS = "wool CHESTERFIELD coat";

module.exports = { checkstock };
async function checkstock(event) {
  const searchMatches = await searchStock(URL, SEARCH_TERMS);
  return respondWithMatches(searchMatches);
}

function respondWithMatches(matches) {
  return {
    statusCode: 200,
    body: JSON.stringify(matches)
  };
}

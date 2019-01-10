const htmlparser = require("htmlparser2");
const searchListings = require("./search");

module.exports = parseListings;

const listingsSearcher = searchListings();
const { isValidListing, addListing, getSearchResults } = listingsSearcher;

function parseListings(allListings) {
  return parseAndSearch(createAndConfigureParser(), allListings);
}

function parseAndSearch(parser, allListings) {
  parse(parser, allListings);
  return getSearchResults();
}

function createAndConfigureParser() {
  return createParser(configureParseHandler());
}

function createParser(parseHandler) {
  return new htmlparser.Parser(parseHandler, {
    decodeEntities: true
  });
}

function parse(parser, allListings) {
  parser.write(allListings);
  parser.end();
}

function configureParseHandler() {
  return {
    onopentag: (tagType, { title = "" }) =>
      validateAndAddListing({ tagType, title })
  };
}

function validateAndAddListing({ tagType, title }) {
  if (isValidListing({ tagType, title })) return addListing(title);
}

const htmlparser = require("htmlparser2");
const utils = require("./utils");

const parseResults = createParseResults();

module.exports = function parseListings(allListings) {
  return parseAndSearch(createAndConfigureParser(), allListings);
};

function parseAndSearch(parser, allListings) {
  parse(parser, allListings);
  return parseResults.getResults();
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

function validateAndAddListing(listing) {
  if (utils.isValidListing(listing)) return parseResults.add(listing.title);
}

function createParseResults() {
  const parseResults = new Set();

  return {
    add: title => parseResults.add(title),
    getResults: () => Array.from(parseResults)
  };
}

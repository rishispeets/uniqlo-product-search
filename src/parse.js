const htmlparser = require("htmlparser2");
const utils = require("./utils");

// ParseResults contains the collection that will hold the finished result
// after parsing. At this point it is empty.
const ParseResults = createParseResults();

module.exports = function parseListings(allListings) {
  return parseAndSearch(createAndConfigureParser(), allListings);
};

function parseAndSearch(parser, allListings) {
  parse(parser, allListings);
  return ParseResults.getResults();
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
  if (utils.isValidListing(listing)) return ParseResults.add(listing.title);
}

function createParseResults() {
  const parseResults = new Set();

  return {
    add: title => parseResults.add(title),
    getResults: () => Array.from(parseResults)
  };
}

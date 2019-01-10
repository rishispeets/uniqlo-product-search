const htmlparser = require("htmlparser2");
const searchListings = require("./search");

module.exports = parseListings;

function parseListings(allListings) {
  return parseAndSearch(configureParseAndSearch(listingsSearcher), allListings);
}

function parseAndSearch({ parser, searcher }, allListings) {
  parse(parser, allListings);
  return searcher.finish();
}

function configureParseAndSearch(listingsSearcher) {
  return {
    parser: createParser(configureParseHandler(listingsSearcher)),
    searcher: listingsSearcher
  };
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

function configureParseHandler(listingsSearcher) {
  return {
    onopentag: onHtmlTag(listingsSearcher)
  };
}

function onHtmlTag(listingsSearcher) {
  return (tagType, { title = "" }) =>
    validateAndAddListing({ tagType, title }, listingsSearcher);
}

function validateAndAddListing(listing, listingsSearcher) {
  const { isValid, add } = listingsSearcher;
  const { tagType, title } = listing;
  if (isValid({ tagType, title })) return add(title);
}

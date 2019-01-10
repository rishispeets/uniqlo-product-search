const htmlparser = require("htmlparser2");
const searchListings = require("./search");

module.exports = parseListings;

function parseListings(allListings) {
  const handler = configureParseHandler();
  return parseAndYield({ parser: createParser(handler), handler }, allListings);
}

function createParser(parseHandler) {
  return new htmlparser.Parser(parseHandler, {
    decodeEntities: true
  });
}

function parseAndYield(parserWithHandler, allListings) {
  const { parser, handler } = parserWithHandler;
  parse(parser, allListings);
  return handler.yield();
}

function parse(parser, allListings) {
  parser.write(allListings);
  parser.end();
}

function configureParseHandler() {
  const listingsSearcher = searchListings();
  return {
    onopentag: onHtmlTag(listingsSearcher),
    yield: () => listingsSearcher.finish()
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

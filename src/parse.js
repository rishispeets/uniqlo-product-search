const htmlparser = require("htmlparser2");
const searchListings = require("./search");

module.exports = parseListings;

function parseListings(allListings) {
  const parser = createParser();
  parser.parse(allListings);
}

function createParser() {
  const parser = new htmlparser.Parser(configureParseHandler(), {
    decodeEntities: true
  });
  return { parse: allListings => parse(parser, allListings) };
}

function configureParseHandler() {
  const listingsSearcher = searchListings();
  return {
    onopentag: onHtmlTag(listingsSearcher),
    onend: () => listingsSearcher.finish()
  };
}

function onHtmlTag(listingsSearcher) {
  return (tagType, { title = "" }) =>
    validateAndAddListing({ tagType, title }, listingsSearcher);
}

function validateAndAddListing(listing, listingsSearcher) {
  const { tagType, title } = listing;
  if (listings.isValid({ tagType, title })) return listingsSearcher.add(title);
}

function parse(parser, allListings) {
  parser.write(allListings);
  parser.end();
}

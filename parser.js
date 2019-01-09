const htmlparser = require("htmlparser2");
const createListings = require("./listings");

module.exports = parseListings;

function parseListings(html) {
  const parser = configureAndInstantiateParser();
  parser.write(html);
  parser.end();
}

function configureAndInstantiateParser() {
  return new htmlparser.Parser(configureParseHandler(), {
    decodeEntities: true
  });
}

function configureParseHandler() {
  const listings = createListings();
  return {
    onopentag: onHtmlTag(listings),
    onend: () => listings.finish()
  };
}

function onHtmlTag(listings) {
  return (tagType, { title = "" }) =>
    validateAndAddListing({ tagType, title }, listings);
}

function validateAndAddListing(listing, listings) {
  const { tagType, title } = listing;
  if (isValid({ tagType, title })) return listings.add(title);
}

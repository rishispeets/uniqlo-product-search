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
  const { isValid, add, finish } = listings;

  return {
    onopentag: (name, { title = "" }) => {
      if (isValid({ htmlElementType: name, listingName: title })) add(title);
    },

    onend: () => finish()
  };
}

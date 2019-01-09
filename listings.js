module.exports = function createListings() {
  const listings = new Set();
  return listingsInterface(listings);
};

function listingsInterface(listings) {
  return {
    isValid: ({ htmlElementType, listingName }) =>
      isCorrectHtmlType(htmlElementType) && isValidListingName(listingName),

    add: listing => listings.add(listing),

    finish: () => {
      console.log(listings);
      console.log(Array.from(listings));
      return Array.from(listings);
    }
  };
}

function isCorrectHtmlType(type) {
  // we're looking for 'a' tags, which contain the listings
  return type === "a";
}

function isValidListingName(name) {
  return !isOneWord(name) && isAllCaps(name);
}

function isOneWord(name) {
  // if there's a space, it's a sentence
  return !name.includes(" ");
}

function isAllCaps(name) {
  return name === name.toUpperCase();
}

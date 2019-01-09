module.exports = createListings;

function createListings() {
  const listings = new Set();
  return {
    isValid: isValidListing,
    add: title => addListing(title, listings),
    finish: () => getListings()
  };
}

function isValidListing({ htmlElementType, listingName }) {
  return isCorrectHtmlType(htmlElementType) && isValidListingName(listingName);
}

function addListing(listing, listings) {
  listings.add(listing);
}

function getListings(listings) {
  return Array.from(listings);
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

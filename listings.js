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
  return listings.add(listing);
}

function getListings(listings) {
  return Array.from(listings);
}

function isCorrectHtmlType(type) {
  return type === "a";
}

function isValidListingName(name) {
  return !isOneWord(name) && isAllCaps(name);
}

function isOneWord(name) {
  return !name.includes(" ");
}

function isAllCaps(name) {
  return name === name.toUpperCase();
}

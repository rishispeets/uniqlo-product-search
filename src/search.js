const utils = require("./utils");

const { isATag, isValidListingName } = utils;

module.exports = searchListings;

function searchListings() {
  const listings = new Set();
  return {
    isValid: isValidListing,
    add: title => addListing(title, listings),
    finish: () => getListings()
  };
}

function isValidListing({ htmlElementType, listingName }) {
  return isATag(htmlElementType) && isValidListingName(listingName);
}

function addListing(listing, listings) {
  return listings.add(listing);
}

function getListings(listings) {
  return Array.from(listings);
}

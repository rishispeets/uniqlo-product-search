const utils = require("./utils");

const { isATag, isValidListingName } = utils;

module.exports = function searchListings() {
  const listings = new Set();
  return {
    isValidListing,
    addListing: title => addListing(title, listings),
    getSearchResults: () => getResult(listings)
  };
};

function isValidListing({ tagType, title }) {
  return isATag(tagType) && isValidListingName(title);
}

function addListing(listing, listings) {
  return listings.add(listing);
}

function getResult(listings) {
  return Array.from(listings);
}

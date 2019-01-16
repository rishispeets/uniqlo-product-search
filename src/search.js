const utils = require("./utils");
const { isEmpty, toTitleCase } = utils;

module.exports = function searchListings(searchTerms, listings) {
  if (hasSomeEmptyInput([searchTerms, listings])) return [];

  return countSortAndFormatResults(searchTerms, listings);
};

function countSortAndFormatResults(terms, listings) {
  return sortAndFormatResults(countTermsInListings(terms, listings));
}

function sortAndFormatResults(counter) {
  return Object.entries(counter)
    .sort(higherTermCountToLower)
    .map(pickListing)
    .map(toTitleCase);
}

// returns a new version of counter with all terms counted
function countTermsInListings(terms, listings) {
  return listings.reduce(countTermsInListingsReducer(terms), {});
}

function countTermsInListingsReducer(terms) {
  return (newCounter, listing) => {
    const count = splitListingAndCountTerms(listing, terms);

    if (listingNotFound(count)) return newCounter;
    return { ...newCounter, [listing]: count };
  };
}

function splitListingAndCountTerms(listing, terms) {
  return terms.reduce(countTerms(listing.split(" ")), 0);
}

function countTerms(listingWords) {
  return (sum, term) => (listingWords.includes(term) ? sum + 1 : sum);
}

function higherTermCountToLower(listingWithCount1, listingWithCount2) {
  return listingWithCount2[1] - listingWithCount1[1];
}

function hasSomeEmptyInput(input) {
  return input.some(input => isEmpty(input));
}

function pickListing([listing]) {
  return listing;
}

function listingNotFound(count) {
  return count === 0;
}

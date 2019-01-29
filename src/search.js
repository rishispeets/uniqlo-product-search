const utils = require("./utils");

const { isEmpty, toTitleCase } = utils;

module.exports = function searchListings(searchTerms, listings) {
  if (isEmpty(searchTerms) || isEmpty(listings)) return [];
  return countSortAndFormatResults(searchTerms, listings);
};

function countSortAndFormatResults(terms, listings) {
  return sortAndFormatResults(countTermsInListings(terms, listings));
}

function sortAndFormatResults(counter) {
  return Object.entries(counter)
    .sort(higherTermCountToLower) // ordering is significant
    .map(onlyKeepListingName)
    .map(toTitleCase);
}

// Returns a counter that contains each listing with a count
// TODO: Make this more efficient
function countTermsInListings(terms, listings) {
  return listings.reduce((counter, listing) => {
    const count = splitAndCountTerms(listingWords, terms);

    if (!count) return counter; // don't include listings without a count
    return { ...counter, [listing]: count };
  }, {});
}

function splitAndCountTerms(listing, terms) {
  return countTerms(listing.split(" "), terms);
}

function countTerms(listingWords, terms) {
  return terms.reduce((count, term) => {
    if (listingWords.includes(term)) return count + 1;
    return count;
  }, 0);
}

// ******************************

function higherTermCountToLower([_, listingOneCount], [__, listingTwoCount]) {
  return listingTwoCount - listingOneCount;
}

function onlyKeepListingName([listing]) {
  return listing;
}

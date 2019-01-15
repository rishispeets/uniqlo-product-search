const utils = require("./utils");
const { isEmpty, lowerCaseAllElements, toTitleCase } = utils;

module.exports = function searchListings(searchTerms, listings) {
  if (isEmpty(searchTerms)) return [];
  if (isEmpty(listings)) return [];

  // make argument validity the responsibility of caller
  const formattedInput = formatInput({ searchTerms, listings });

  return countSortAndFormatResults(
    formattedInput.searchTerms,
    formattedInput.listings
  );
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
  const listingWords = listing.split(" ");
  return terms.reduce(countTerms(listingWords), 0);
}

function countTerms(listingWords) {
  return (acc, term) => (listingWords.includes(term) ? acc + 1 : acc);
}

function higherTermCountToLower(listingWithCount1, listingWithCount2) {
  return listingWithCount2[1] - listingWithCount1[1];
}

function pickListing(listingWithCount) {
  return listingWithCount[0];
}

function listingNotFound(count) {
  return count === 0;
}

function formatInput({ searchTerms, listings }) {
  return {
    searchTerms: lowerCaseAllElements(searchTerms.split(" ")),
    listings: lowerCaseAllElements(listings)
  };
}

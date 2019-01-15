const utils = require("./utils");
const { isEmpty, lowerCaseAllElements, toTitleCase } = utils;

module.exports = function searchListings(searchTermsString, listings) {
  if (isEmpty(searchTermsString)) return [];
  if (isEmpty(listings)) return [];

  const searchTerms = searchTermsString.split(" ");
  const lowerCaseTerms = lowerCaseAllElements(searchTerms);
  const lowerCaseListings = lowerCaseAllElements(listings);

  const termsMatchedCounter = createTermMatchCounter(lowerCaseListings);
  const counterWithResults = countTermsInListings(
    termsMatchedCounter,
    lowerCaseTerms
  );

  const sortedSearchResults = sortAndFormatResults(counterWithResults);

  console.log("Terms: ", searchTermsString);
  console.log("Sorted: ", sortedSearchResults);

  return sortedSearchResults;
};

function sortAndFormatResults(counter) {
  return Object.entries(counter)
    .sort(higherTermCountToLower)
    .map(pickListing)
    .map(toTitleCase);
}

function createTermMatchCounter(listings) {
  return listings.reduce(
    (counter, listing) => ({ ...counter, [listing]: 0 }),
    {}
  );
}

// returns a new version of counter with all terms counted
function countTermsInListings(counter, terms) {
  const listings = Object.keys(counter);
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

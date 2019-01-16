const rewire = require("rewire");
const searchListings = rewire("../search");
const sortAndFormatResults = searchListings.__get__("sortAndFormatResults");
const countTermsInListingsReducer = searchListings.__get__(
  "countTermsInListingsReducer"
);
const splitListingAndCountTerms = searchListings.__get__(
  "splitListingAndCountTerms"
);
const countTerms = searchListings.__get__("countTerms");
const higherTermCountToLower = searchListings.__get__("higherTermCountToLower");
const hasSomeEmptyInput = searchListings.__get__("hasSomeEmptyInput");
const pickListing = searchListings.__get__("pickListing");
const termsNotFound = searchListings.__get__("termsNotFound");

describe("sortAndFormatResults", () => {
  test("Should return empty array for empty counter", () => {
    const counter = {};
    const expected = [];

    const actual = sortAndFormatResults(counter);

    expect(expected).toEqual(actual);
  });

  test("Should sort from high listing count to low, strip count, title case listings, and return listing[]", () => {
    const counter = {
      "men blocktech single breasted coat": 1,
      "men ultra warm down hooded coat": 1,
      "men ultra light down seamless hooded parka": 1,
      "men seamless down hooded parka": 1,
      "men ultra light down half coat": 1,
      "men seamless down hooded long coat": 2,
      "men seamless down hooded coat": 2,
      "men cashmere woolblend chesterfield coat": 1
    };
    const expected = [
      "Men Seamless Down Hooded Long Coat",
      "Men Seamless Down Hooded Coat",
      "Men Blocktech Single Breasted Coat",
      "Men Ultra Warm Down Hooded Coat",
      "Men Ultra Light Down Seamless Hooded Parka",
      "Men Seamless Down Hooded Parka",
      "Men Ultra Light Down Half Coat",
      "Men Cashmere Woolblend Chesterfield Coat"
    ];

    const actual = sortAndFormatResults(counter);

    expect(expected).toEqual(actual);
  });
});

describe("searchListings", () => {
  const sampleListings = [
    "men blocktech fishtail parka",
    "men blocktech hooded fishtail parka",
    "men blocktech hooded parka",
    "men blocktech single breasted coat",
    "men blocktech hooded raincoat parka",
    "men ultra warm down hooded coat",
    "men non-quilted hooded down jacket",
    "men ultra light down seamless hooded parka",
    "men ultra light down compact jacket",
    "men light down vest",
    "men ultra light down jacket",
    "men seamless down hooded parka",
    "men ultra light down half coat",
    "men seamless down hooded long coat",
    "men seamless down hooded coat",
    "men printed fleece long sleeved zipped jacket",
    "men fluffy yarn fleece zipped jacket",
    "men fleece highneck long sleeved zipped jacket",
    "men jersey washed work jacket",
    "men uniqlo u milano ribbed jacket",
    "men uniqlo u pocketable coach jacket",
    "men harrington jacket",
    "men denim jacket",
    "men wool stretch slim fit jacket",
    "men comfort blazer jacket",
    "men wool slim fit stretch blazer suit jacket",
    "men wool stretch blazer suit jacket",
    "men wool slim fit stretch suit jacket",
    "men cashmere woolblend chesterfield coat"
  ];
  const searchTermsWithoutResult = [
    ["evil", "rabid", "bunnies"],
    ["pants"],
    [""]
  ];
  const searchTermsWithSortedResults = [
    {
      term: ["blocktech"],
      results: [
        "Men Blocktech Fishtail Parka",
        "Men Blocktech Hooded Fishtail Parka",
        "Men Blocktech Hooded Parka",
        "Men Blocktech Single Breasted Coat",
        "Men Blocktech Hooded Raincoat Parka"
      ]
    },
    {
      term: ["blocktech", "parka"],
      results: [
        "Men Blocktech Fishtail Parka",
        "Men Blocktech Hooded Fishtail Parka",
        "Men Blocktech Hooded Parka",
        "Men Blocktech Hooded Raincoat Parka",
        "Men Blocktech Single Breasted Coat",
        "Men Ultra Light Down Seamless Hooded Parka",
        "Men Seamless Down Hooded Parka"
      ]
    },
    {
      term: ["blocktech", "fishtail", "parka"],
      results: [
        "Men Blocktech Fishtail Parka",
        "Men Blocktech Hooded Fishtail Parka",
        "Men Blocktech Hooded Parka",
        "Men Blocktech Hooded Raincoat Parka",
        "Men Blocktech Single Breasted Coat",
        "Men Ultra Light Down Seamless Hooded Parka",
        "Men Seamless Down Hooded Parka"
      ]
    },
    {
      term: ["seamless", "coat"],
      results: [
        "Men Seamless Down Hooded Long Coat",
        "Men Seamless Down Hooded Coat",
        "Men Blocktech Single Breasted Coat",
        "Men Ultra Warm Down Hooded Coat",
        "Men Ultra Light Down Seamless Hooded Parka",
        "Men Seamless Down Hooded Parka",
        "Men Ultra Light Down Half Coat",
        "Men Cashmere Woolblend Chesterfield Coat"
      ]
    }
  ];

  test("should return '[]' when given empty listings '[]'", () => {
    expect(searchListings(["parka"], [])).toEqual([]);
  });

  searchTermsWithoutResult.forEach(term => {
    test(`should return '[]' for term:'${term}'`, () => {
      expect(searchListings(term, sampleListings)).toEqual([]);
    });
  });

  searchTermsWithSortedResults.forEach(({ term, results }) => {
    test(`should return '[${results}]' for term:'${term}'`, () => {
      expect(searchListings(term, sampleListings)).toEqual(results);
    });
  });
});

describe("countTermsInListingsReducer", () => {
  test("when no `terms` are found, return given `newCounter`", () => {
    const terms = ["seamless", "coat"];
    const newCounter = {
      "men blocktech single breasted coat": 1,
      "men ultra warm down hooded coat": 1,
      "men ultra light down seamless hooded parka": 1,
      "men seamless down hooded parka": 1,
      "men ultra light down half coat": 1,
      "men seamless down hooded long coat": 2,
      "men seamless down hooded coat": 2
    };
    const listing = "men wool slim fit stretch suit jacket";

    const expected = newCounter;
    const actual = countTermsInListingsReducer(terms)(newCounter, listing);

    expect(expected).toBe(actual);
  });

  test("when `term` is found, return new counter, which is {...newCounter, listing: count}", () => {
    const terms = ["seamless", "coat"];
    const newCounter = {
      "men blocktech single breasted coat": 1,
      "men ultra warm down hooded coat": 1,
      "men ultra light down seamless hooded parka": 1,
      "men seamless down hooded parka": 1,
      "men ultra light down half coat": 1,
      "men seamless down hooded long coat": 2,
      "men seamless down hooded coat": 2
    };
    const listing = "men cashmere woolblend chesterfield coat";

    const expected = {
      "men blocktech single breasted coat": 1,
      "men ultra warm down hooded coat": 1,
      "men ultra light down seamless hooded parka": 1,
      "men seamless down hooded parka": 1,
      "men ultra light down half coat": 1,
      "men seamless down hooded long coat": 2,
      "men seamless down hooded coat": 2,
      "men cashmere woolblend chesterfield coat": 1
    };
    const actual = countTermsInListingsReducer(terms)(newCounter, listing);

    expect(expected).toEqual(actual);
  });
});

describe("splitListingAndCountTerms", () => {
  test("should return `0` for `listing`:'men ultra light down jacket' and `terms`:['seamless', 'coat']", () => {
    const listing = "men ultra light down jacket";
    const terms = ["seamless", "coat"];

    const expected = 0;
    const actual = splitListingAndCountTerms(listing, terms);

    expect(expected).toBe(actual);
  });

  test("should return `1` for `listing`:'men seamless down hooded parka' and `terms`:['seamless', 'coat']", () => {
    const listing = "men seamless down hooded parka";
    const terms = ["seamless", "coat"];

    const expected = 1;
    const actual = splitListingAndCountTerms(listing, terms);

    expect(expected).toBe(actual);
  });

  test("should return `1` for `listing`:'men ultra light down half coat' and `terms`:['seamless', 'coat']", () => {
    const listing = "men ultra light down half coat";
    const terms = ["seamless", "coat"];

    const expected = 1;
    const actual = splitListingAndCountTerms(listing, terms);

    expect(expected).toBe(actual);
  });

  test("should return `2` for `listing`:'men seamless down hooded long coat' and `terms`:['seamless', 'coat']", () => {
    const listing = "men seamless down hooded long coat";
    const terms = ["seamless", "coat"];

    const expected = 2;
    const actual = splitListingAndCountTerms(listing, terms);

    expect(expected).toBe(actual);
  });
});

describe("countTerms", () => {
  test("should return 0 when `listingWords`: [], and `sum`: 0 and `term`: ''", () => {
    const listingWords = [];
    const sum = 0;
    const term = "";

    const expected = 0;
    const actual = countTerms(listingWords)(sum, term);

    expect(expected).toBe(actual);
  });

  test("should return 0 when `listingWords`: ['pants'], and `sum`:0 and `term`: ''", () => {
    const listingWords = ["pants"];
    const sum = 0;
    const term = "";

    const expected = 0;
    const actual = countTerms(listingWords)(sum, term);

    expect(expected).toBe(actual);
  });

  test("should return 0 when `listingWords`: [], and `sum`: 0 and `term`: 'pants'", () => {
    const listingWords = [];
    const sum = 0;
    const term = "pants";

    const expected = 0;
    const actual = countTerms(listingWords)(sum, term);

    expect(expected).toBe(actual);
  });

  test("should return 1 when `listingWords`: ['pants'], and `sum`: 0 and `term`: 'pants'", () => {
    const listingWords = ["pants"];
    const sum = 0;
    const term = "pants";

    const expected = 1;
    const actual = countTerms(listingWords)(sum, term);

    expect(expected).toBe(actual);
  });

  test("should return 1 when `listingWords`: ['pants', 'hat'], and `sum`: 0 and `term`: 'pants'", () => {
    const listingWords = ["pants", "hat"];
    const sum = 0;
    const term = "pants";

    const expected = 1;
    const actual = countTerms(listingWords)(sum, term);

    expect(expected).toBe(actual);
  });

  test("should return 2 when `listingWords`: ['pants'], and `sum`: 1 and `term`: 'pants'", () => {
    const listingWords = ["pants"];
    const sum = 1;
    const term = "pants";

    const expected = 2;
    const actual = countTerms(listingWords)(sum, term);

    expect(expected).toBe(actual);
  });
});

describe("higherTermCountToLower", () => {
  test("returns `listingTwoCount` - `listingOneCount`, when given `([listingOne, listingOneCount], [listingOne, listingTwoCount])`", () => {
    const listingOne = ["a hat", 1];
    const listingTwo = ["some pants", 2];
    expect(higherTermCountToLower(listingOne, listingTwo)).toBe(2 - 1);
  });
});

describe("hasSomeEmptyInput", () => {
  test("should return `true` if given `input`: [[], []]", () => {
    expect(hasSomeEmptyInput([[], []])).toBe(true);
  });

  test("should return `true` if given `input`: [[1], []]", () => {
    expect(hasSomeEmptyInput([[1], []])).toBe(true);
  });

  test("should return `false` if given `input`: [[1,2,3], [1,2,3]]", () => {
    expect(hasSomeEmptyInput([[1, 2, 3], [1, 2, 3]])).toBe(false);
  });
});

describe("pickListing", () => {
  test("should return 'someArr' when given '[someArr]'", () => {
    const someArr = [1, 2, 3];

    expect(pickListing([someArr])).toBe(someArr);
  });
});

describe("termsNotFound", () => {
  const nonZeroNumbers = [-Infinity, -1, 1, Infinity];

  nonZeroNumbers.forEach(n => {
    test(`should return 'false' if 'count': ${n}`, () => {
      expect(termsNotFound(n)).toBe(false);
    });
  });

  test("should return `true` if given `count`: 0", () => {
    expect(termsNotFound(0)).toBe(true);
  });
});

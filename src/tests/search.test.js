const rewire = require("rewire");
const searchListings = rewire("../search");

describe("searchListings", () => {
  const sampleListings = [
    "Men Blocktech Fishtail Parka",
    "Men Blocktech Hooded Fishtail Parka",
    "Men Blocktech Hooded Parka",
    "Men Blocktech Single Breasted Coat",
    "Men Blocktech Hooded Raincoat Parka",
    "Men Ultra Warm Down Hooded Coat",
    "Men Non-quilted Hooded Down Jacket",
    "Men Ultra Light Down Seamless Hooded Parka",
    "Men Ultra Light Down Compact Jacket",
    "Men Light Down Vest",
    "Men Ultra Light Down Jacket",
    "Men Seamless Down Hooded Parka",
    "Men Ultra Light Down Half Coat",
    "Men Seamless Down Hooded Long Coat",
    "Men Seamless Down Hooded Coat",
    "Men Printed Fleece Long Sleeved Zipped Jacket",
    "Men Fluffy Yarn Fleece Zipped Jacket",
    "Men Fleece Highneck Long Sleeved Zipped Jacket",
    "Men Jersey Washed Work Jacket",
    "Men Uniqlo U Milano Ribbed Jacket",
    "Men Uniqlo U Pocketable Coach Jacket",
    "Men Harrington Jacket",
    "Men Denim Jacket",
    "Men Wool Stretch Slim Fit Jacket",
    "Men Comfort Blazer Jacket",
    "Men Wool Slim Fit Stretch Blazer Suit Jacket",
    "Men Wool Stretch Blazer Suit Jacket",
    "Men Wool Slim Fit Stretch Suit Jacket",
    "Men Cashmere Woolblend Chesterfield Coat"
  ];
  const searchTermsWithoutResult = ["evil rabid bunnies", "pants", ""];
  const searchTermsWithSortedResults = [
    {
      term: "blocktech",
      results: [
        "Men Blocktech Fishtail Parka",
        "Men Blocktech Hooded Fishtail Parka",
        "Men Blocktech Hooded Parka",
        "Men Blocktech Single Breasted Coat",
        "Men Blocktech Hooded Raincoat Parka"
      ]
    },
    {
      term: "blocktech parka",
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
      term: "blocktech fishtail parka",
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
      term: "seamLess COat",
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
    expect(searchListings("parka", [])).toEqual([]);
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

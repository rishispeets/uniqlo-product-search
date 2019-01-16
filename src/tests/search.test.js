const rewire = require("rewire");
const searchListings = rewire("../search");

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

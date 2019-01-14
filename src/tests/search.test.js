const rewire = require("rewire");
const searchListings = rewire("../search");

describe("searchListings", () => {
  const sampleListings = [
    "50 - 70 €",
    "70 - 100 €",
    "MEN BLOCKTECH FISHTAIL PARKA",
    "MEN BLOCKTECH HOODED FISHTAIL PARKA",
    "MEN BLOCKTECH HOODED PARKA",
    "MEN BLOCKTECH SINGLE BREASTED COAT",
    "MEN BLOCKTECH HOODED RAINCOAT PARKA",
    "MEN ULTRA WARM DOWN HOODED COAT",
    "MEN NON-QUILTED HOODED DOWN JACKET",
    "MEN ULTRA LIGHT DOWN SEAMLESS HOODED PARKA",
    "MEN ULTRA LIGHT DOWN COMPACT JACKET",
    "MEN LIGHT DOWN VEST",
    "MEN ULTRA LIGHT DOWN JACKET",
    "MEN SEAMLESS DOWN HOODED PARKA",
    "MEN ULTRA LIGHT DOWN HALF COAT",
    "MEN SEAMLESS DOWN HOODED LONG COAT",
    "MEN SEAMLESS DOWN HOODED COAT",
    "MEN PRINTED FLEECE LONG SLEEVED ZIPPED JACKET",
    "MEN FLUFFY YARN FLEECE ZIPPED JACKET",
    "MEN FLEECE HIGHNECK LONG SLEEVED ZIPPED JACKET",
    "MEN JERSEY WASHED WORK JACKET",
    "MEN UNIQLO U MILANO RIBBED JACKET",
    "MEN UNIQLO U POCKETABLE COACH JACKET",
    "MEN HARRINGTON JACKET",
    "MEN DENIM JACKET",
    "MEN WOOL STRETCH SLIM FIT JACKET",
    "MEN COMFORT BLAZER JACKET",
    "MEN WOOL SLIM FIT STRETCH BLAZER SUIT JACKET",
    "MEN WOOL STRETCH BLAZER SUIT JACKET",
    "MEN WOOL SLIM FIT STRETCH SUIT JACKET",
    "MEN CASHMERE WOOLBLEND CHESTERFIELD COAT"
  ];
  const searchTermsWithoutResult = [
    "lol this aint no coat",
    "pants",
    "WOMAN JACKET"
  ];
  const searchTermsWithResult = [
    {
      term: "blocktech hooded parka",
      result: [
        "MEN BLOCKTECH HOODED FISHTAIL PARKA",
        "MEN BLOCKTECH HOODED PARKA",
        "MEN BLOCKTECH HOODED RAINCOAT PARKA"
      ]
    },
    {
      term: "pocketable Coach jacket",
      result: ["MEN UNIQLO U POCKETABLE COACH JACKET"]
    },
    {
      term: "CHESTERFIELD coat",
      result: ["MEN CASHMERE WOOLBLEND CHESTERFIELD COAT"]
    }
  ];

  searchTermsWithoutResult.forEach(term => {
    test(`should return '[]' for '${term}'`, () => {
      expect(searchListings(term, sampleListings)).toEqual([]);
    });
  });

  searchTermsWithResult.forEach(({ term, result }) => {
    test(`should return '${result}' for '${term}'`, () => {
      expect(searchListings(term, sampleListings)).toEqual(result);
    });
  });
});

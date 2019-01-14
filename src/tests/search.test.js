const rewire = require("rewire");
const searchListings = rewire("../search");

describe("searchListings", () => {
  test("should match given searchTerms to listings", () => {
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
    const searchTermsWithoutResults = [
      "lol this aint no coat",
      "pants",
      "WOMAN JACKET"
    ];

    expect(searchListings("a stone", sampleListings)).toEqual([]);
    expect(searchListings("ROCKET man", sampleListings)).toEqual([]);
    expect(searchListings("WOMAN JACKET", sampleListings)).toEqual([]);
    expect(searchListings("blocktech hooded parka", sampleListings)).toEqual([
      "MEN BLOCKTECH HOODED FISHTAIL PARKA",
      "MEN BLOCKTECH HOODED PARKA",
      "MEN BLOCKTECH HOODED RAINCOAT PARKA"
    ]);
    expect(searchListings("pocketable Coach jacket", sampleListings)).toEqual([
      "MEN UNIQLO U POCKETABLE COACH JACKET"
    ]);
    expect(searchListings("CHESTERFIELD coat"), sampleListings).toEqual([
      "MEN CASHMERE WOOLBLEND CHESTERFIELD COAT"
    ]);
  });
});

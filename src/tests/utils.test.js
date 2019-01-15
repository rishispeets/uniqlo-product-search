const rewire = require("rewire");
const utils = rewire("../utils");
const isAlphabetical = utils.__get__("isAlphabetical");
const lowerCaseAllElements = utils.__get__("lowerCaseAllElements");

describe("isAlphabetical", () => {
  const nonAlphabetical = ["%whsuhuhw", "%$%$%^", "_~`hahaha", "no!"];
  const alphabetical = ["HELLO THERE", "heLLo", "oh noo", "yes1 true"];

  testCollection(false, nonAlphabetical);
  testCollection(true, alphabetical);
});

function testCollection(expectedValue, collection) {
  return collection.forEach(element =>
    test(`should return '${expectedValue}' for '${element}'`, () =>
      expect(isAlphabetical(element)).toBe(expectedValue))
  );
}

describe("lowerCaseAllElements", () => {
  test("should return empty '[]' for given empty '[]'", () => {
    expect(lowerCaseAllElements([])).toEqual([]);
  });

  test("should return '[]' with all string elements lowercased", () => {
    const sampleArray = [
      "MEN BLOCKTECH FISHTAIL PARKA",
      "MEN FLEECE HIGHNECK LONG SLEEVED ZIPPED JACKET",
      "MEN CASHMERE WOOLBLEND CHESTERFIELD COAT"
    ];
    const expected = [
      "men blocktech fishtail parka",
      "men fleece highneck long sleeved zipped jacket",
      "men cashmere woolblend chesterfield coat"
    ];

    expect(lowerCaseAllElements(sampleArray)).toEqual(expected);
  });
});

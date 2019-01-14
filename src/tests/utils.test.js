const rewire = require("rewire");
const utils = rewire("../utils");
const isAlphabetical = utils.__get__("isAlphabetical");

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

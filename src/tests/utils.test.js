const rewire = require("rewire");
const utils = rewire("../utils");
const isAlphabetical = utils.__get__("isAlphabetical");

describe("isAlphabetical", () => {
  const nonAlphabetical = ["%whsuhuhw", "%$%$%^", "_~`hahaha", "no!"];
  const alphabetical = ["HELLO THERE", "heLLo", "oh noo", "yes1 true"];

  const testCollection = (expectedValue, collection) =>
    collection.forEach(string =>
      test(`should return '${expectedValue}' for '${string}'`, () =>
        expect(isAlphabetical(string)).toBe(expectedValue))
    );

  testCollection(false, nonAlphabetical);
  testCollection(true, alphabetical);
});

const rewire = require("rewire");
const utils = rewire("../utils");
const isAlphabetical = utils.__get__("isAlphabetical");

describe("isAlphabetical", () => {
  const nonAlphabetical = ["%whsuhuhw", "%$%$%^", "_~`hahaha", "no!"];
  const alphabetical = ["heLLo", "oh noo", "yes1 true"];

  nonAlphabetical.forEach(string =>
    test(`should return 'false' for '${string}'`, () =>
      expect(isAlphabetical(string)).toBe(false))
  );

  alphabetical.forEach(string =>
    test(`should return 'true' for '${string}'`, () =>
      expect(isAlphabetical(string)).toBe(false))
  );
});

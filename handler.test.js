const handler = require("./handler");
const axios = require("axios");
const htmlparser = require("htmlparser2");

jest.mock("axios");

describe("getHtml", () => {
  test("it should retrieve html", () => {
    const url = "https://www.uniqlo.com/eu/en_NL/men/outerwear/coats-jackets";
    const response = "<html><body><p>hello</p></body></html>";

    axios.get.mockImplementation(() => Promise.resolve(response));
    const result = handler.getHtml(url);

    expect(typeof result).toBe("string");
    expect(probablyHasHtmlElements(result)).toBe(true);
  });
});

// This is a very sloppy check but will do.
function probablyHasHtmlElements(str) {
  return /<[a-z][\s\S]*>/i.test(str);
}

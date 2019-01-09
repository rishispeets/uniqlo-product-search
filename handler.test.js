const handler = require("./handler");
const axios = require("axios");
const htmlparser = require("htmlparser2");

jest.mock("axios");

describe("getHtml", () => {
  const URL = "https://www.uniqlo.com/eu/en_NL/men/outerwear/coats-jackets";
  const mockAxiosImplAndGetResult = async fakeResponse => {
    axios.get.mockImplementation(() => Promise.resolve(fakeResponse));
    return await handler.getHtml(URL);
  };

  test("it should retrieve html", async () => {
    const fakeResponse = "<html><body><p>hello</p></body></html>";

    const result = await mockAxiosImplAndGetResult(fakeResponse);

    expect(typeof result).toBe("string");
    expect(probablyHasHtmlElements(result)).toBe(true);
  });

  test("it should log an error when thrown by the API", async () => {
    const fakeResponse = JSON.stringify({
      statusCode: 404,
      body: "Just an error"
    });

    const result = await mockAxiosImplAndGetResult(fakeResponse);

    expect(typeof result).toBe("string");
    expect(probablyHasHtmlElements(result)).toBe(false);
    // TODO: Add another test here without mocking the console.
  });
});

// This is a very sloppy check but will do.
function probablyHasHtmlElements(str) {
  return /<[a-z][\s\S]*>/i.test(str);
}

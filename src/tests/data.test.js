const getListings = require("../data");
const axios = require("axios");

jest.mock("axios");

describe("data", () => {
  const URL = "https://www.uniqlo.com/eu/en_NL/men/outerwear/coats-jackets";
  const mockAxiosImplAndGetResult = async fakeResponse => {
    axios.get.mockImplementation(() => Promise.resolve(fakeResponse));
    return await getListings(URL);
  };

  test("it should retrieve html", async () => {
    const fakeResponse = {
      statusCode: 200,
      data: "<html><body><p>hello</p></body></html>"
    };

    const result = await mockAxiosImplAndGetResult(fakeResponse);

    expect(typeof result).toBe("string");
    expect(probablyHasHtmlElements(result)).toBe(true);
  });
});

// This is a very sloppy check but will do.
function probablyHasHtmlElements(str) {
  return /<[a-z][\s\S]*>/i.test(str);
}

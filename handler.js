const searchStock = require("./src/index");

module.exports = { checkstock };

async function checkstock(event) {
  const { url, searchTerms } = JSON.parse(event);

  if (!isUniqloUrl(url))
    return new Error("Please pass a Uniqlo url with product listings");

  return searchStock(url, searchTerms);
}

function isUniqloUrl(url) {
  return url.includes("uniqlo.com");
}

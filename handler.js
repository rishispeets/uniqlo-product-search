const searchStock = require("./src/index");

module.exports = { checkstock };

async function checkstock({ url, searchTerms }) {
  if (!isUniqloUrl(URL))
    return new Error("Please pass a Uniqlo url with product listings");

  return searchStock(url, searchTerms);
}

function isUniqloUrl(url) {
  return url.includes("uniqlo.com");
}

module.exports = {
  isValidListing
};

function isValidListing({ tagType, title }) {
  return isATag(tagType) && isValidListingName(title);
}

function isATag(type) {
  return type === "a";
}

function isValidListingName(name) {
  return !isOneWord(name) && isAllCaps(name);
}

function isOneWord(name) {
  return !name.includes(" ");
}

function isAllCaps(name) {
  return name === name.toUpperCase();
}

function isAlphabetical(name) {
  return name.match(/^[a-z0-9]+$/g) !== null;
}

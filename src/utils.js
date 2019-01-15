module.exports = {
  isValidListing,
  toTitleCase,
  lowerCaseAllElements,
  isEmpty
};

function isValidListing({ tagType, title }) {
  return isATag(tagType) && isValidListingName(title);
}

function isATag(type) {
  return type === "a";
}

function isValidListingName(title) {
  return isAlphabetical(title) && !isOneWord(title) && isAllCaps(title);
}

function isOneWord(title) {
  return !title.includes(" ");
}

function isAllCaps(title) {
  return title === title.toUpperCase();
}

function isAlphabetical(title) {
  return title.match(/^[a-z0-9 ]+$/i) !== null;
}

function toTitleCase(str) {
  return str
    .split(" ")
    .map(capitalizeFirstLetter)
    .join(" ");
}

function capitalizeFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function lowerCaseAllElements(arr) {
  return arr.map(element => element.toLowerCase());
}

function isEmpty(arr) {
  return !arr.length;
}

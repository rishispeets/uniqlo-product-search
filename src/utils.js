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

module.exports = {
  isATag,
  isValidListingName
};

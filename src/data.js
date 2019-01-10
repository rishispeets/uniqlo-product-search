const axios = require("axios");

module.exports = getListings;

async function getListings(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

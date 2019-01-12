const axios = require("axios");

module.exports = getListingsPage;

async function getListingsPage(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

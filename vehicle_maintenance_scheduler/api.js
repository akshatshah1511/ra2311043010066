require("dotenv").config({ path: require('path').resolve(__dirname, '../.env') });
const axios = require("axios");

const headers = {
  Authorization: `Bearer ${process.env.TOKEN}`
};

const getDepots = async () => {
  const res = await axios.get(
    `${process.env.BASE_URL}/depots`,
    { headers, timeout: 5000 }
  );
  return res.data;
};

const getVehicles = async () => {
  const res = await axios.get(
    `${process.env.BASE_URL}/vehicles`,
    { headers, timeout: 5000 }
  );
  return res.data;
};

module.exports = { getDepots, getVehicles };

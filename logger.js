require("dotenv").config({ path: require('path').resolve(__dirname, '../.env') });
const axios = require("axios");

const log = async (stack, level, pkg, message) => {
  try {
    await axios.post(
      `${process.env.BASE_URL}/logs`,
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
          "Content-Type": "application/json"
        },
        timeout: 5000
      }
    );
  } catch (err) {
    console.error("Logging failed:", err.response?.status, err.message);
  }
};

module.exports = log;
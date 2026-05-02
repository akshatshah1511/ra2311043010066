const axios = require("axios");

const BASE_URL = "http://20.207.122.201/evaluation-service";

const headers = {
    Authorization: `Bearer YOUR_TOKEN`
};

const getDepots = async () => {
    const res = await axios.get(`${BASE_URL}/departments`, { headers });
    return res.data;
};

const getVehicles = async () => {
    const res = await axios.get(`${BASE_URL}/vehicles`, { headers });
    return res.data;
};

module.exports = { getDepots, getVehicles };

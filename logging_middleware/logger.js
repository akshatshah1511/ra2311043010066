const axios = require("axios");

const log = async (stack, level, pkg, message) => {
    try {
        await axios.post(
            "http://20.207.122.201/evaluation-service/logs",
            {
                stack,
                level,
                package: pkg,
                message
            },
            {
                headers: {
                    Authorization: `Bearer YOUR_ACCESS_TOKEN`
                }
            }
        );
    } catch (err) {
        console.error("Logging failed");
    }
};

module.exports = log;

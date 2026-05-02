const express = require("express");
const log = require("../logging_middleware/logger");

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
    await log("backend", "info", "controller", "Root API hit");
    res.send("Backend running");
});

app.listen(3000, () => {
    console.log("Server started");
});

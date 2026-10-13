
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve your existing HTML, CSS, and other frontend files.
app.use(express.static(__dirname));

app.get("/health", (req, res) => {
    res.send("GCREVIVAL server is running!");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`GCREVIVAL is running on port ${PORT}`);
});

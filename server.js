
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get("/health", (req, res) => {
    res.send("GCREVIVAL server is running!");
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("chat message", (data) => {
        if (!data ||
            typeof data.username !== "string" ||
            typeof data.message !== "string") {
            return;
        }

        const username = data.username.trim().slice(0, 30);
        const message = data.message.trim().slice(0, 1000);

        if (!username || !message) return;

        io.emit("chat message", { username, message });
    });
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`GCREVIVAL is running on port ${PORT}`);
});

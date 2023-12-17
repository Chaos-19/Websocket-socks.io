const express = require("express");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3500;

const app = express();

const expressServer = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

const io = new Server(expressServer, {
    cors: {
        origin: "*"
    }
});

io.on("connection", socket => {
    console.log(`user ${socket.id} connected`);

    socket.on("message", msg => {
        io.emit("message", `${socket.id.substring(0, 5)} : ${msg}`);
    });
});

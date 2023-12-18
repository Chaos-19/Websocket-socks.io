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

    //upon connection only to user
    socket.emit("message", "welcome to chat app");

    //upOn notify other user the new User connected
    socket.broadcast.emit(
        // broadcast will send to all user other user
        "message",
        `user ${socket.id.substring(0, 5)} connected`
    );

    //listening for message event
    socket.on("message", msg => {
        io.emit("message", `${socket.id.substring(0, 5)} : ${msg}`);
    });

    //disconnect when user disconnect
    io.on("disconnect", () => {
        socket.broadcast.emit(
            "disconnect",
            `User ${socket.id.substring(0, 5)} disconnect`
        );
    });

    //listening for activity event
    socket.on("activity", msg => {
        socket.broadcast.emit("activity", `${msg}`);
    });
});

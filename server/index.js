const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();

const io = new Server(httpServer, {
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

httpServer.listen(3500, () => {
    console.log("listening on port 3500");
});

const ws = require("ws");
const server = new ws.Server({ port: "3000" });

server.on("connection", socket => {
    console.log("connection stablishd");
    socket.on("message", msg => {
        console.log(msg.toString());
        socket.send(msg);
    });
});

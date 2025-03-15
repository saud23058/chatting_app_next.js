"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const httpServer = http_1.default.createServer();
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    console.log("A user connected :", socket.id);
    socket.on("sendMessage", (msg) => {
        io.emit("receiveMessage", msg);
        console.log("receiveMessage", msg);
    });
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
httpServer
    .once("error", (err) => {
    console.error(err);
    process.exit(1);
})
    .listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
});

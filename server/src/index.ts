import { Server } from "socket.io";
import http from "http"

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const httpServer= http.createServer()
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected :",socket.id);

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
import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
   
    
    console.log(`A user is connected with id: ${socket.id}`);

  
    socket.emit("message", (text:string)=>{
      console.log(text); 
    } );

    socket.on("received", (data) => {
      console.log(`Received message: ${data}`);
    });

    socket.on('disconnect',()=>{
      console.log(`Disconnected: ${socket.id}`);
    })
  });

  httpServer.once("error", (error) => {
    console.error(error);
    process.exit(1);
  });


  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});

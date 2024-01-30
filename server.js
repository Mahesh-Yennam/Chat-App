import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
// import { fileURLToPath } from "url";

const __dirname = path.resolve();
// console.log(__dirname);
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// app.use(express.static("/public"));
app.use(express.static(__dirname + "/public"));

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("User Connected...");

  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});

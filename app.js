const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const httpServer = createServer(app);

app.use(cors());
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("connected !!!");

  socket.on("beginPath", (arg) => {
    socket.broadcast.emit("beginPath", arg);
  });

  socket.on("drawLine", (arg) => {
    socket.broadcast.emit("drawLine", arg);
  });

  socket.on("changeConfig", (arg) => {
    console.log(arg);
    socket.broadcast.emit("changeConfig", arg);
  });
});

httpServer.listen(3000, () => console.log("app starts"));

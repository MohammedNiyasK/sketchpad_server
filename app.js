const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const httpServer = createServer(app);

const url =
  app.settings.env === "development"
    ? "http://localhost:5173"
    : "https://sketchpad-ruby.vercel.app";

console.log(url);

app.use(
  cors({
    origin: ["http://localhost:5173", "https://sketchpad-ruby.vercel.app"],
  })
);
const io = new Server(httpServer, {
  cors: {
    origin: url,
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
    socket.broadcast.emit("changeConfig", arg);
  });

  socket.on("menuItem", (arg) => {
    socket.broadcast.emit("menuItem", arg);
  });
});

httpServer.listen(3000, () => console.log("app starts"));

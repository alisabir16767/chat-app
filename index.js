const express = require("express");
const { createServer } = require("http");
const { join } = require("path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// Socket.IO connection event
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

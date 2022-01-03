// ! Add "type": "module" if wanna do "import ... from ..." syntax
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const cors = require("cors");

app.use(cors);

// app.use("cors");
const io = socketio(server, {
  cors: {},
  origin: "*",
  methods: ["GET", "POST"],
});

// TODO: Move these variables to utils/config.js
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

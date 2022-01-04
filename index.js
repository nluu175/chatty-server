// ! Add "type": "module" if wanna do "import ... from ..." syntax
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./utils/config");
const logger = require("./utils/logger");

const userRouter = require("./routes/userRouter");
const loginRouter = require("./routes/loginRouter");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/api/login", loginRouter);

// app.post("/login", (req, res) => {
//   console.log("a person logged in");
//   res.send({
//     token: "test123",
//   });
// });

app.get("/", (req, res) => {
  res.send("<h1>Welcome To Chatty!!!</h1>");
});

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// ! Socket IO;
// * Move this to other file if possible
io.on("connection", (socket) => {
  logger.info("a user connected");

  socket.on("message", (data) => {
    logger.info(data);
  });

  socket.on("disconnect", () => {
    logger.info("A user disconnected");
  });
});

server.listen(config.PORT, () => {
  logger.info(`Server running at http://localhost:${config.PORT}`);
});

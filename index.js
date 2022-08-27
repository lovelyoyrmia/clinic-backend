const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const { PORT } = require("./config/app.config");
const router = require("./router/_index");
const Notification = require("./controllers/notification.controller");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: true }));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 1000000,
    limit: "50mb",
  })
);

app.use("/api", router);

// SOCKET CONFIG
const messages = [];
io.on("connection", (socket) => {
  const notif = new Notification(socket);
  console.log(`User connected: ${socket.id}`);
  console.log(messages);

  notif.sendNotification();

  socket.on("disconnect", () => {
    console.log("user disconnected " + socket.id);
  });
});

server.listen(PORT || 5000, () => {
  console.log(`Server is running on PORT ${PORT || 5000}.`);
});

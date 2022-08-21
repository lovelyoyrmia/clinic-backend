const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const { PORT } = require("./config/app.config");
const router = require("./router/_index");

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
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.emit("hai", { message: "haiiiiii" });
  socket.on("disconnect", () => {
    console.log("user disconnected " + socket.id);
  });
});
// app.use("/apiv2/patient", authUser, authRole(ROLE.patient), authRouter);
// app.use("/apiv2/doctor", authUser, authRole(ROLE.doctor), authRouter);

server.listen(PORT || 5000, () => {
  console.log(`Server is running on PORT ${PORT || 5000}.`);
});

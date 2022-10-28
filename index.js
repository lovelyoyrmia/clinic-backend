const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = require("./router/_index");
const db = require("./models");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
module.exports = server;
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 1000000,
    limit: "50mb",
  })
);

app.use("/api", router);

server.listen(5000, () => {
  console.log(`Server is running on PORT ${5000}.`);
});

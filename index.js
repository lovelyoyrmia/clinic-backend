const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { PORT } = require("./config/app.config");
const router = require("./router/_index");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// db.sequelize
//   .authenticate()
//   .then(() => {
//     console.log("success");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

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

server.listen(PORT || 5000, () => {
  console.log(`Server is running on PORT ${PORT || 5000}.`);
});

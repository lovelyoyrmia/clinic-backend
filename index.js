const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PORT } = require("./config/app.config");
const {
  validateAuthToken,
  setUser,
  authUser,
  authRole,
} = require("./middleware/app.middleware");
const { authRouter } = require("./router/auth.router");
const { dataRouter } = require("./router/data.router");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 1000000,
    limit: "50mb",
  })
);

// app.use(validateAuthToken);
// app.use(setUser);

app.use("/api", dataRouter);

app.use("/auth/admin", authUser, authRole("ADMIN"), authRouter);
app.use("/auth/user", authUser, authRole("USER"), authRouter);

app.listen(PORT || 5000, () => {
  console.log(`Server is running on PORT ${PORT || 5000}.`);
});

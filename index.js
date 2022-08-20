const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PORT } = require("./config/app.config");
const router = require("./router/_index");

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

app.use("/api", router);
// app.use("/apiv2/patient", authUser, authRole(ROLE.patient), authRouter);
// app.use("/apiv2/doctor", authUser, authRole(ROLE.doctor), authRouter);

app.listen(PORT || 5000, () => {
  console.log(`Server is running on PORT ${PORT || 5000}.`);
});

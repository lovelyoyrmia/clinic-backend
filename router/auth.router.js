const express = require("express");
const authRouter = express.Router();

// Admin Router
authRouter.get("/hello", (req, res) => {
  res.send("dashboard page");
});
// router.post("/admin/signIn", signInAdmin);
// router.post("/user/signIn", signUpUser);
// router.post("/user/signIn", signUpUser);

module.exports = { authRouter };

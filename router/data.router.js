const express = require("express");
const {
  addDatabase,
  getRoleDatabase,
  getAllDatabase,
} = require("../controllers/app.controllers");
const dataRouter = express.Router();

dataRouter.post("/addRole", addDatabase);
dataRouter.post("/getRole", getRoleDatabase);
dataRouter.post("/getAllData", getAllDatabase);

module.exports = { dataRouter };

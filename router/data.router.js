const express = require("express");
const {
  addDatabase,
  getRoleDatabase,
  getAllDatabase,
  getEmailData,
  getData,
  updateDatabase,
  deleteId,
} = require("../controllers/app.controllers");
const dataRouter = express.Router();

dataRouter.post("/addData", addDatabase);
dataRouter.post("/getRole", getRoleDatabase);
dataRouter.post("/getDataByEmail", getEmailData);
dataRouter.post("/getAllData", getAllDatabase);
dataRouter.post("/getData/:id", getData);
dataRouter.post("/updateData/:id", updateDatabase);
dataRouter.post("/deleteId/:id", deleteId);

module.exports = { dataRouter };

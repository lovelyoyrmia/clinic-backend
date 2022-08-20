const express = require("express");
const UserController = require("../controllers/patient.controllers");
const router = express.Router();

// USER
router.post("/addData", UserController.addDatabase);
router.post("/getAllData", UserController.getAllDatabase);
router.post("/getData/:id", UserController.getDatabaseById);
router.put("/updateData/:id", UserController.updateDatabase);
router.delete("/deleteData/:id", UserController.deleteId);

module.exports = router;

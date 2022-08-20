const express = require("express");
const DoctorController = require("../controllers/doctors.controllers");
const router = express.Router();

// DOCTOR
router.post("/addData", DoctorController.addDatabase);
router.post("/getAllData", DoctorController.getAllDatabase);
router.post("/getData/:id", DoctorController.getDatabaseById);
router.put("/updateData/:id", DoctorController.updateDatabase);
router.delete("/deleteData/:id", DoctorController.deleteId);

module.exports = router;

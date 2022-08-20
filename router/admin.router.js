const express = require("express");
const AdminController = require("../controllers/admin.controllers");
const router = express.Router();

// DOCTOR
router.post("/getAllUsers", AdminController.getAllUsers);
router.post("/getUser/:id", AdminController.getUser);
router.put("/updateUser/:id", AdminController.updateVerifiedUser);
router.delete("/deleteUser/:id", AdminController.deleteUser);

router.post("/getAllDoctors", AdminController.getAllDoctors);
router.post("/getDoctor/:id", AdminController.getDoctor);
router.put("/updateDoctor/:id", AdminController.updateVerifiedDoctor);
router.delete("/deleteDoctor/:id", AdminController.deleteDoctor);

router.post("/getAppointments", AdminController.getAppointments);

module.exports = router;

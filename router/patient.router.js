const express = require("express");
const PatientController = require("../controllers/patient.controllers");
const router = express.Router();

// USER
router.post("/addUser", PatientController.addPatient);
router.get("/patients", PatientController.getPatients);
router.get("/patient/:id", PatientController.getPatient);
router.put("/patient/:id", PatientController.updatePatient);
router.put("/patientVerified/:id", PatientController.updateVerifiedPatient);
router.delete("/patient/:id", PatientController.deletePatient);

module.exports = router;

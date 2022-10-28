const express = require("express");
const AdminController = require("../controllers/admin.controllers");
const BookingController = require("../controllers/booking.controllers");
const PatientController = require("../controllers/patient.controllers");
const {
  validateAuthToken,
  authRole,
  authUser,
} = require("../middleware/app.middleware");
const { ROLE } = require("../utils/utils");
const router = express.Router();

// AUTH
router.post("/register", AdminController.register);
router.post("/login", AdminController.login);
router.get("/token", AdminController.refreshToken);
router.delete("/logout", AdminController.logout);

router.use(validateAuthToken);
router.use(authUser);
router.use(authRole(ROLE.admin));
// PATIENTS
router.post("/addUser", PatientController.addPatient);
router.get("/patients", PatientController.getPatients);
router.get("/patient/:id", PatientController.getPatient);
router.put("/patient/:id", PatientController.updatePatient);
router.put("/patientVerified/:id", PatientController.updateVerifiedPatient);
router.delete("/patient/:id", PatientController.deletePatient);

// APPOINTMENT
router.post("/appointments", BookingController.addAppointment);
router.get("/appointments", BookingController.getAppointments);
router.get("/appointments/:uid", BookingController.getAppointmentsByPatient);
router.get("/appointment/:uid", BookingController.getAppointmentsById);
router.put("/appointment/:uid", BookingController.updateAppointment);
router.delete("/appointment/:uid", BookingController.deleteAppointment);

module.exports = router;

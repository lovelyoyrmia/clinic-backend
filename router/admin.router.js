const express = require("express");
const AdminController = require("../controllers/admin.controllers");
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

// PATIENTS
router.post(
  "/addUser",
  validateAuthToken,
  authUser,
  authRole(ROLE.admin),
  AdminController.addUser
);
router.post(
  "/patients",
  validateAuthToken,
  authUser,
  authRole(ROLE.admin),
  AdminController.getAllUsers
);
router.post(
  "/patient/:id",
  validateAuthToken,
  authUser,
  authRole(ROLE.admin),
  AdminController.getUser
);
router.put(
  "/updatePatient/:id",
  validateAuthToken,
  authUser,
  authRole(ROLE.admin),
  AdminController.updateUser
);
router.put(
  "/updateVerifiedPatient/:id",
  validateAuthToken,
  authUser,
  authRole(ROLE.admin),
  AdminController.updateVerifiedUser
);
router.post(
  "/deletePatient/:id",
  validateAuthToken,
  authUser,
  authRole(ROLE.admin),
  AdminController.deleteUser
);

// DOCTORS
router.post(
  "/doctors",
  validateAuthToken,
  authUser,
  authRole(ROLE.admin),
  AdminController.getAllDoctors
);
router.post(
  "/doctor/:id",
  validateAuthToken,
  authUser,
  authRole(ROLE.admin),
  AdminController.getDoctor
);
router.put(
  "/updateDoctor/:id",
  validateAuthToken,
  authUser,
  authRole(ROLE.admin),
  AdminController.updateVerifiedDoctor
);
router.post(
  "/deleteDoctor/:id",
  validateAuthToken,
  authUser,
  authRole(ROLE.admin),
  AdminController.deleteDoctor
);

// APPOINTMENT
router.post(
  "/appointments",
  validateAuthToken,
  authUser,
  authRole(ROLE.admin),
  AdminController.getAppointments
);

module.exports = router;

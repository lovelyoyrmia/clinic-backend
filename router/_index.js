const express = require("express");
const patientRouter = require("../router/patient.router");
const appointmentRouter = require("../router/data.router");
const adminRouter = require("../router/admin.router");
const {
  validateAuthToken,
  setUser,
  authUser,
  authRole,
} = require("../middleware/app.middleware");
const errorHandler = require("../middleware/errorHandler");
const { ROLE } = require("../utils/utils");
const router = express.Router();

router.use("/admin", adminRouter);
router.use(setUser);
router.use(authUser);
// router.use(validateAuthToken);
router.use("/patient", authRole(ROLE.admin, ROLE.patient), patientRouter);
router.use(
  "/appointment",
  authRole(ROLE.admin, ROLE.patient),
  appointmentRouter
);
router.use(errorHandler);

module.exports = router;

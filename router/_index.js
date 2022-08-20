const express = require("express");
const doctorRouter = require("../router/doctors.router");
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

router.use(setUser);
router.use(authUser);
// router.use(validateAuthToken);
router.use("/doctor", authRole(ROLE.admin, ROLE.doctor), doctorRouter);
router.use("/patient", authRole(ROLE.admin, ROLE.patient), patientRouter);
router.use("/admin", authRole(ROLE.admin), adminRouter);
router.use("/appointment", appointmentRouter);
router.use(errorHandler);

module.exports = router;

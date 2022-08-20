const express = require("express");
const AdminController = require("../controllers/admin.controllers");
const router = express.Router();

// DOCTOR
router.get("/", (req, res) => {
  res.send("Haiii");
});
router.post("/getAllUsers", AdminController.getAllUsers);
router.post("/getUser/:id", AdminController.getUserById);
router.put("/updateUser/:id", AdminController.updateVerifiedUser);
router.post("/deleteUserId/:id", AdminController.deleteUserId);
router.post("/getAppointments/:id", AdminController.getAppointments);

module.exports = router;

const express = require("express");
const BookingController = require("../controllers/booking.controllers");
const router = express.Router();

router.post("/addData", BookingController.addDatabase);
router.post("/getRole", BookingController.getRoleDatabase);
router.post("/getDataByEmail", BookingController.getEmailData);
router.post("/getAllData/:role", BookingController.getAllDatabase);
router.post("/getData/:id", BookingController.getDataById);
router.post("/updateData/:id", BookingController.updateDatabase);
router.post("/deleteId/:id", BookingController.deleteId);

module.exports = router;

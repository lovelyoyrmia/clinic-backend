const express = require("express");
const BookingController = require("../controllers/booking.controllers");
const router = express.Router();

router.post("/addData", BookingController.addDatabase);
router.post("/getRole", BookingController.getRoleDatabase);
router.post("/getDataByEmail", BookingController.getEmailData);
router.post("/getAllData/", BookingController.getAllDatabase);
router.post("/getData/:id", BookingController.getDataById);
router.put("/updateData/:id", BookingController.updateDatabase);
router.delete("/deleteId/:id", BookingController.deleteId);

module.exports = router;

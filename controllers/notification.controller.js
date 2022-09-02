const BookingModels = require("../models/booking.models");
const { DATA } = require("../utils/utils");

const notification = new BookingModels(DATA.notification);
class Notification {
  constructor(socket) {
    this.socket = socket;
  }

  sendNotification = () => {
    this.socket.on("sendNotification", (data) => {
      if (data != null) {
        this.socket.emit("newRegistered", "");
      }
    });
  };
}

module.exports = Notification;

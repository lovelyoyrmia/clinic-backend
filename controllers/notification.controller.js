class Notification {
  constructor(socket) {
    this.socket = socket;
  }

  sendNotification = () => {
	let messages = [];
    this.socket.on("sendNotification", ({ senderId, result }) => {
      const data = {};
      data["senderId"] = senderId;
      data["result"] = result;
      messages.push(data);
    });
	return messages;
  };
}

module.exports = Notification;

function errorHandler(err, req, res, next) {
  switch (err.code) {
    case "auth/id-token-expired":
      return res.status(400).json({ message: err.message });
    case "auth/invalid-email":
      return res.status(400).json({ message: err.message });
    case "auth/session-cookie-expired":
      return res.status(400).json({ message: err.message });
    case "auth/user-not-found":
      return res.status(404).json({ message: err.message });
    case "No Data":
      return res.status(404).json({ message: err.message });
    case undefined:
      return res.status(404).json({ message: err.message });
    case "Unauthorized":
      return res.status(401).json({ message: err.message });
    case "Forbidden":
      return res.status(401).json({ message: err.message });

    default:
      break;
  }
}

module.exports = errorHandler;

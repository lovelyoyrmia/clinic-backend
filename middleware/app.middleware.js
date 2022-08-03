const { admin } = require("../config/app.config");
const auth = admin.auth();

const validateAuthToken = async (req, res, next) => {
  console.log("Checking request if authorized with Firebase ID Token");
  // if no Token was passed
  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")) &&
    !(req.cookies && req.cookies._session)
  ) {
    console.error("No Token pass as a Bearer token in header");
    res.status(403).send("Unauthorized");
    return;
  }

  let authToken;
  // if Token was passed
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    console.log("Authorization header was Found");
    authToken = req.headers.authorization.split("Bearer ")[1];
    console.log(authToken);
  } else if (req.cookies) {
    console.log("Cookie Session was Found");
    // store token from cookie
    authToken = req.cookies._session;
  } else {
    // No cookie was found
    res.status(403).send("Unauthorized");
    return;
  }

  try {
    const decodedToken = await auth.verifyIdToken(authToken);
    console.log("Token has been decoded", decodedToken);
    req.user = decodedToken;
    res.locals = {
      ...res.locals,
      uid: decodedToken.uid,
      email: decodedToken.email,
    };
    return next();
  } catch (error) {
    console.error(error);
    res.status(403).send("Unauthorized");
    return;
  }
};

const setUser = async (req, res, next) => {
  const { email, role } = req.body;
  try {
    const user = await auth.getUserByEmail(email);
    const userId = user.uid;
    if (user) {
      req.user = {
        userId: userId,
        role: role,
      };
    }
    return next();
  } catch (error) {
    console.error(error);
    res.status(403).send("Unauthorized");
    return;
  }
};

const authUser = (req, res, next) => {
  if (req.user == null) {
    res.status(403);
    return res.send({ message: "You need to sign in" });
  }
  next();
};

const authRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role && role !== "USER") {
      res.status(401).send({ message: "Not allowed" });
    }
    next();
  };
};

module.exports = {
  validateAuthToken,
  setUser,
  authUser,
  authRole,
};

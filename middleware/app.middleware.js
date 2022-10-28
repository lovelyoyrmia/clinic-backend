const { admin } = require("../config/app.config");
const { ROLE } = require("../utils/utils");
const { verifyJwt } = require("../helpers/jsonwebtoken");
const auth = admin.auth();

const validateAuthToken = async (req, res, next) => {
  console.log("Checking request if authorized with Access Token");
  // if no Token was passed
  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")) &&
    !(req.cookies && req.cookies._session)
  ) {
    throw {
      code: "Unauthorized",
      message: "No Token pass as a Bearer token in header",
    };
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
    throw { code: "Unauthorized", message: "You don't have permission" };
  }

  try {
    let decodedToken;
    req.user = {
      ...req.user,
      accessToken: authToken,
    };
    if (req.query.role === ROLE.admin) {
      decodedToken = verifyJwt(authToken, process.env.ACCESS_TOKEN_SECRET);
      req.user.role = { ADMIN: req.query.role, USER: ROLE.user };
      console.log(req.user);
    } else {
      decodedToken = await auth.verifyIdToken(authToken);
    }
    console.log("Token has been decoded", decodedToken);
    return next();
  } catch (error) {
    next(error);
  }
};

const setUser = async (req, res, next) => {
  const { email, role } = req.query;
  try {
    const user = await auth.getUserByEmail(email);
    const userId = user.uid;
    if (user) {
      req.user = {
        userId: userId,
        email: user.email,
      };
      req.user.role = { ...role, USER: ROLE.user };
      console.log(req.user);
    } else {
      throw {
        code: "Unauthorized",
        message: "Not Allowed",
      };
    }

    return next();
  } catch (error) {
    console.error(error.code);
    next(error);
  }
};

const authUser = (req, res, next) => {
  if (req.user == null) {
    res.status(403);
    return res.json({ message: "You need to sign in" });
  }
  const roles = Object.values(req.user.role);
  req.roles = roles;
  next();
};

const authRole = (...allowedRole) => {
  return (req, res, next) => {
    if (!req?.roles) return res.status(401).json({ message: "Not allowed" });

    const rolesArr = [...allowedRole];
    console.log(rolesArr);
    console.log("roles", req.roles);
    const result = req.roles
      .map((role) => rolesArr.includes(role))
      .find((val) => val === true);
    if (!result) return res.status(401).json({ message: "Not allowed" });

    next();
  };
};

module.exports = {
  validateAuthToken,
  setUser,
  authUser,
  authRole,
};

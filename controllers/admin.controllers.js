const AdminAuth = require("../models/admin.model");
const {
  comparePassword,
  hashPassword,
} = require("../helpers/generate_password");
const { signJwt, verifyJwt } = require("../helpers/jsonwebtoken");

class AdminController {
  // ============== USER ==============

  async register(req, res, next) {
    try {
      if (!req.body.email || !req.body.password)
        throw { code: "Bad Request", message: "Email or Password is required" };
      const { name, email, password } = req.body;
      const hash = hashPassword(password);
      const newUser = { name, email, password: hash };
      const findUser = await AdminAuth.findOne({ where: { email: email } });
      if (findUser)
        throw { code: "Bad Request", message: "Email already exists" };
      const user = await AdminAuth.create(newUser);
      res
        .status(200)
        .json({ message: "Success", data: { id: user.id, email: user.email } });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      if (!req.body.email || !req.body.password)
        throw { code: "Bad Request", message: "Email or Password is required" };
      const { email, password } = req.body;
      const user = await AdminAuth.findOne({ where: { email: email } });
      if (!user) throw { code: "No Data", message: "User not found" };
      const matchPass = comparePassword(password, user.password);
      if (!matchPass) throw { code: "Bad Request", message: "Wrong Password" };
      const payload = { id: user.id, email: user.email };
      const accessToken = signJwt(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        "10s"
      );
      const refreshToken = signJwt(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        "1d"
      );
      await AdminAuth.update(
        { refresh_token: refreshToken },
        { where: { id: user.id } }
      );
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 3600 * 1000,
      });
      res.status(200).json({
        message: "Success",
        data: {
          accessToken: accessToken,
          expiresIn: new Date().setSeconds(10),
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.cookies.refresh_token;
      console.log(refreshToken);
      if (!refreshToken) throw { code: "Forbidden", message: "Not Allowed" };
      const user = await AdminAuth.findOne({
        where: { refresh_token: refreshToken },
      });
      if (!user) throw { code: "Forbidden", message: "Not Found" };
      const decodedToken = verifyJwt(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const accessToken = signJwt(
        {
          id: decodedToken.id,
          name: decodedToken.name,
          email: decodedToken.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        "1hr"
      );
      res
        .status(200)
        .json({ message: "Success", data: { accessToken: accessToken } });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const refreshToken = req.cookies.refresh_token;
      if (!refreshToken) throw { code: "Unauthorized", message: "Not Allowed" };
      const user = await AdminAuth.findOne({
        where: { refresh_token: refreshToken },
      });
      if (!user) throw { code: "Forbidden", message: "Not Found" };
      await AdminAuth.update(
        { refresh_token: null },
        { where: { id: user.id } }
      );
      res.clearCookie("refresh_token");
      return res.status(200).json({ message: "Success" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new AdminController();

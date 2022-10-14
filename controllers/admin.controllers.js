const { DATA, ROLE } = require("../utils/utils");
const AdminAuth = require("../models/admin.model");
const {
  comparePassword,
  hashPassword,
} = require("../helpers/generate_password");
const Database = require("../models/user.models");
const { signJwt, verifyJwt } = require("../helpers/jsonwebtoken");
const DatabaseBooking = require("../models/booking.models");

const patient = new Database(DATA.patient);
const doctor = new Database(DATA.doctor);
const booking = new DatabaseBooking(DATA.booking);
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
      res
        .status(200)
        .json({ message: "Success", data: { accessToken: accessToken } });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      console.log(req.cookies);
      const refreshToken = req.cookies.refresh_token;
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

  async addUser(req, res, next) {
    try {
      const {
        uid,
        name,
        email,
        age,
        birth,
        maritalStatus,
        weight,
        height,
        phoneNumber,
        gender,
        blood,
        address,
        province,
        city,
      } = req.body;
      const currentDate = new Date().toLocaleString();
      const data = {
        uid: uid,
        name: name,
        email: email,
        age: age,
        birth: birth,
        gender: gender,
        weight: weight,
        height: height,
        marital_status: maritalStatus,
        phone_number: phoneNumber,
        is_verified: false,
        blood: blood,
        address: address,
        province: province,
        city: city,
        image_url: "",
        created_at: currentDate,
      };
      await patient.saveData(uid, data);
      res.status(200).json({ message: "Success", data: data });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const uid = req.params.id;

      const docRef = await patient.getDataById(uid);
      if (docRef != null) {
        res.status(200).json({ message: "Success", data: docRef.data() });
      } else {
        throw { code: "No Data", message: "No data was found" };
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const docRef = await patient.getData();
      if (docRef == null) {
        throw { code: "No Data", message: "No data was found" };
      } else {
        const results = [];
        docRef.forEach((doc) => {
          const data = doc.data();
          results.push(data);
        });
        res.status(200).json({ message: "Success", data: results });
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const uid = req.params.id;
      let data;
      if ("image_url" in req.body) {
        data = {
          image_url: req.body.image_url,
        };
      } else {
        const {
          name,
          email,
          age,
          birth,
          maritalStatus,
          weight,
          height,
          phoneNumber,
          gender,
          blood,
          address,
          province,
          city,
        } = req.body;

        data = {
          name: name,
          email: email,
          age: age,
          birth: birth,
          gender: gender,
          weight: weight,
          height: height,
          maritalStatus: maritalStatus,
          phoneNumber: phoneNumber,
          blood: blood,
          address: address,
          province: province,
          city: city,
        };
      }

      const docRef = await patient.updateData(uid, data);
      if (docRef != null) {
        res.status(200).json({ message: "Success", data: data });
      } else {
        throw { code: "No Data", message: "No data was found" };
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  async updateVerifiedUser(req, res, next) {
    try {
      const uid = req.params.id;
      const data = {
        is_verified: true,
      };

      const docRef = await patient.updateData(uid, data);
      if (docRef != null) {
        res.status(200).json({ message: "Success", data: data });
      } else {
        throw { code: "No Data", message: "No data was found" };
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const uid = req.params.id;
      const doc = await patient.deleteDataById(uid);
      if (doc != null) {
        res.status(200).json({ message: "Success" });
      } else {
        throw { code: "No Data", message: "No data was found" };
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  // ============== DOCTOR ==============

  async getDoctor(req, res, next) {
    try {
      const uid = req.params.id;

      const docRef = await doctor.getDataById(uid);
      if (docRef != null) {
        res.status(200).json({ message: "Success", data: docRef.data() });
      } else {
        throw { code: "No Data", message: "No data was found" };
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  async getAllDoctors(req, res, next) {
    try {
      const docRef = await doctor.getData();
      if (docRef == null) {
        throw { code: "No Data", message: "No data was found" };
      } else {
        const results = [];
        docRef.forEach((doc) => {
          const data = doc.data();
          results.push(data);
        });
        res.status(200).json({ message: "Success", data: results });
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  async updateVerifiedDoctor(req, res, next) {
    try {
      const uid = req.params.id;
      const data = {
        isVerified: true,
      };

      const docRef = await doctor.updateData(uid, data);
      if (docRef != null) {
        res.status(200).json({ message: "Success", data: data });
      } else {
        throw { code: "No Data", message: "No data was found" };
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  async deleteDoctor(req, res, next) {
    try {
      const uid = req.params.id;
      const doc = await doctor.deleteDataById(uid);
      if (doc == null) {
        res.status(200).json({ message: "Success" });
      } else {
        throw { code: "No Data", message: "No data was found" };
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  // ============== APPOINTMENTS ==============

  async getAppointments(req, res, next) {
    try {
      const role = ROLE.patient;

      const docRef = await booking.getDataByRole(role);
      if (docRef == null) {
        throw { code: "No Data", message: "No data was found" };
      } else {
        const results = [];
        for (let index = 0; index < docRef.length; index++) {
          const data = {};
          const collection = docRef[index];
          data["email"] = collection.id;
          const doc = await booking.getDataByEmail(role, data["email"]);
          const resArr = [];
          if (doc != null) {
            doc.forEach((result) => {
              let resData = result.data();
              resData["docId"] = result.id;
              resArr.push(resData);
            });
            data["results"] = resArr;
            results.push(data);
          }
        }
        if (results.length === 0) {
          res
            .status(200)
            .json({ message: "Success", data: null, code: "No Data" });
        } else {
          res.status(200).json({ message: "Success", data: results });
        }
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}

module.exports = new AdminController();

const Database = require("../models/user.models");
const DatabaseBooking = require("../models/booking.models");
const { DATA, ROLE } = require("../utils/utils");

const patient = new Database(DATA.patient);
const doctor = new Database(DATA.doctor);
const booking = new DatabaseBooking(DATA.booking);
class AdminController {
  // ============== USER ==============
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

  async updateVerifiedUser(req, res, next) {
    try {
      const uid = req.params.id;
      const data = {
        isVerified: true,
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

const Database = require("../models/user.models");
const { DATA } = require("../utils/utils");

const user = new Database(DATA.patient);
class UserController {
  async addDatabase(req, res, next) {
    try {
      const {
        uid,
        name,
        email,
        age,
        birthDate,
        birthPlace,
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
        // age: age,
        // birthDate: birthDate,
        // birthPlace: birthPlace,
        // gender: gender,
        // weight: weight,
        // height: height,
        // maritalStatus: maritalStatus,
        // phoneNumber: phoneNumber,
        // isVerified: false,
        // blood: blood,
        // address: address,
        // province: province,
        // city: city,
        // createdAt: currentDate,
      };
      await user.saveData(uid, data);
      res.status(200).json({ message: "Success", data: data });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  async getDatabaseById(req, res, next) {
    try {
      const uid = req.params.id;

      const docRef = await user.getDataById(uid);
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

  async getAllDatabase(req, res, next) {
    try {
      const docRef = await user.getData();
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
      console.log(error);
      next(error);
    }
  }

  async updateDatabase(req, res, next) {
    try {
      const uid = req.params.id;
      const {
        name,
        email,
        age,
        birthDate,
        birthPlace,
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
      const data = {
        name: name,
        email: email,
        // age: age,
        // birthDate: birthDate,
        // birthPlace: birthPlace,
        // gender: gender,
        // weight: weight,
        // height: height,
        // maritalStatus: maritalStatus,
        // phoneNumber: phoneNumber,
        // blood: blood,
        // address: address,
        // province: province,
        // city: city,
      };

      const docRef = await user.updateData(uid, data);
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

  async deleteId(req, res, next) {
    try {
      const uid = req.params.id;
      const doc = await user.deleteDataById(uid);
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
}

module.exports = new UserController();

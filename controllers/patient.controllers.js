const Database = require("../models/user.models");
const { DATA } = require("../utils/utils");

const patient = new Database(DATA.patient);
class PatientController {
  async addPatient(req, res, next) {
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

  async getPatient(req, res, next) {
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

  async getPatients(req, res, next) {
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

  async updatePatient(req, res, next) {
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

  async updateVerifiedPatient(req, res, next) {
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

  async deletePatient(req, res, next) {
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
}

module.exports = new PatientController();

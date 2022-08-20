const Database = require("../models/booking.models");
const { DATA } = require("../utils/utils");

const booking = new Database(DATA.booking);
class BookingController {
  async addDatabase(req, res, next) {
    try {
      const { uid, name, email, symptoms, option, date, role } = req.body;
      const currentDate = new Date().toLocaleString();
      const data = {
        uid: uid,
        name: name,
        email: email,
        symptoms: symptoms,
        option: option,
        appointmentDate: date,
        role: role,
        createdAt: currentDate,
      };
      await booking.saveData(role, data, email);
      // data["role"] = role;
      res.status(200).json({ message: "Success", data: data });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  async getRoleDatabase(req, res, next) {
    try {
      const { role } = req.body;

      const docRef = await booking.getDataByRole(role);
      const resArr = [];
      const data = {};
      if (docRef.length != 0) {
        docRef.forEach((collection) => {
          data["email"] = collection.id;
          data["role"] = role;
          resArr.push(data);
        });

        res.status(200).json({ message: "Success", data: resArr });
      } else {
        throw { code: "No Data", message: "No data was found" };
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  async getDataById(req, res, next) {
    try {
      const { role, email } = req.body;
      const id = req.params.id;

      const docRef = await booking.getDataById(role, email, id);
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

  async getEmailData(req, res, next) {
    try {
      const { role, email } = req.body;

      const docRef = await booking.getDataByEmail(role, email);

      if (docRef != null) {
        const resArr = [];
        docRef.forEach((result) => {
          let resData = result.data();
          resData["docId"] = result.id;
          resArr.push(resData);
        });
        res.status(200).json({ message: "Success", data: resArr });
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
      const role = req.params.role;

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
          throw { code: "No Data", message: "No data was found" };
        } else {
          res.status(200).json({ message: "Success", data: results });
        }
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateDatabase(req, res, next) {
    try {
      const { role, email } = req.body;
      const id = req.params.id;
      const data = {};

      const docRef = await booking.updateData(role, email, id, data);
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
      const { role, email } = req.body;
      const id = req.params.id;
      const doc = await booking.deleteDataById(role, email, id);
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

module.exports = new BookingController();

const Database = require("../models/booking.models");
const PatientDatabase = require("../models/user.models");
const { DATA } = require("../utils/utils");

const booking = new Database(DATA.booking);
const patient = new PatientDatabase(DATA.patient);
class BookingController {
  async addAppointment(req, res, next) {
    try {
      const { uid, name, email, symptoms, option, date } = req.body;
      const currentDate = new Date().toLocaleString();
      const data = {
        uid: uid,
        name: name,
        email: email,
        symptoms: symptoms,
        option: option,
        appointmentDate: date,
        createdAt: currentDate,
      };
      await booking.saveData(data, uid);
      res.status(200).json({ message: "Success", data: data });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  async getAppointments(req, res, next) {
    try {
      const docPatient = await patient.getData();
      if (docPatient == null)
        throw { code: "No Data", message: "No data was found" };
      const patientId = new Set();
      console.time("fast load");
      docPatient.forEach((doc) => {
        patientId.add(doc.id);
      });
      const patientPromise = [...patientId].map((id) => booking.getData(id));
      const results = await Promise.all(patientPromise);
      const appointments = [];
      Promise.all(
        results.map((appoint) =>
          appoint.forEach((ress) => appointments.push(ress.data()))
        )
      );
      console.timeEnd("fast load");
      res.status(200).json({
        message: "Success",
        data: appointments,
      });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  async getAppointmentsByPatient(req, res, next) {
    try {
      const uid = req.params.uid;
      const docRef = await booking.getData(uid);
      if (docRef == null)
        throw { code: "No Data", message: "No data was found" };
      const results = [];
      docRef.forEach((doc) => {
        const data = doc.data();
        results.push({
          docId: doc.id,
          ...data,
        });
      });
      res.status(200).json({ message: "Success", data: results });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  async getAppointmentsById(req, res, next) {
    try {
      const uid = req.params.uid;
      const id = req.query.id;
      const docRef = await booking.getDataById(uid, id);
      if (docRef == null)
        throw { code: "No Data", message: "No data was found" };
      res.status(200).json({ message: "Success", data: docRef.data() });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  async updateAppointment(req, res, next) {
    try {
      const uid = req.params.uid;
      const id = req.query.id;
      const { name, email, symptoms, option, date } = req.body;
      const currentDate = new Date().toLocaleString();
      const data = {
        uid: uid,
        name: name,
        email: email,
        symptoms: symptoms,
        option: option,
        appointmentDate: date,
        updatedAt: currentDate,
      };
      const docRef = await booking.updateData(uid, id, data);
      if (docRef == null)
        throw { code: "No Data", message: "No data was found" };
      res.status(200).json({ message: "Success", data: data });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
  async deleteAppointment(req, res, next) {
    try {
      const uid = req.params.uid;
      const id = req.query.id;
      await booking.deleteData(uid, id);
      res.status(200).json({ message: "Success" });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}

module.exports = new BookingController();

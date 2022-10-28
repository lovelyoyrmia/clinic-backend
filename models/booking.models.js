const { admin } = require("../config/app.config");
const { DATA } = require("../utils/utils");

class BookingModels {
  constructor(collection) {
    this.collection = collection;
    this.patient = DATA.patient;
    this.admin = admin.firestore();
  }

  async saveData(data, uid) {
    const docRef = this.admin
      .collection(this.patient)
      .doc(uid)
      .collection(this.collection)
      .doc();
    const res = await docRef.set(data);
    return res;
  }

  async getData(uid) {
    try {
      const docRef = this.admin
        .collection(this.patient)
        .doc(uid)
        .collection(this.collection);
      const response = await docRef.get();
      return response;
    } catch (error) {
      return null;
    }
  }

  async getDataById(uid, id) {
    try {
      const docRef = this.admin
        .collection(this.patient)
        .doc(uid)
        .collection(this.collection)
        .doc(id);
      const response = await docRef.get();
      return response;
    } catch (error) {
      return null;
    }
  }

  async updateData(uid, id, data) {
    try {
      const docRef = this.admin
        .collection(this.patient)
        .doc(uid)
        .collection(this.collection)
        .doc(id);

      const response = await docRef.update(data);
      return response;
    } catch (error) {
      return null;
    }
  }

  async deleteData(uid, id) {
    const docRef = this.admin
      .collection(this.patient)
      .doc(uid)
      .collection(this.collection)
      .doc(id);
    const response = await docRef.delete();
    return response;
  }
}

module.exports = BookingModels;

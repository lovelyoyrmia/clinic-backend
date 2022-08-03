const { admin } = require("../config/app.config");

class Database {
  constructor() {
    this.collection = "data";
    this.admin = admin.firestore();
  }

  async saveData(role, data, email) {
    const docRef = this.admin
      .collection(this.collection)
      .doc(role)
      .collection(email)
      .doc();
    const res = await docRef.set(data);
    return res;
  }

  async getAllData(role) {
    const docRef = this.admin.collection(this.collection).doc(role);
    return this.admin.getAll(docRef);
  }

  async getDataByRole(role) {
    const docRef = this.admin.collection(this.collection).doc(role);
    const response = docRef.listCollections();
    return response;
  }

  async getDataByEmail(role, email) {
    const docRef = this.admin
      .collection(this.collection)
      .doc(role)
      .collection(email);
    const response = docRef.get();
    return response;
  }

  async getDataById(role, email, id) {
    const docRef = this.admin
      .collection(this.collection)
      .doc(role)
      .collection(email)
      .doc(id);

    const response = await docRef.get();
    return response;
  }

  async updateData(role, email, id, data) {
    const docRef = this.admin
      .collection(this.collection)
      .doc(role)
      .collection(email)
      .doc(id);

    const response = await docRef.update(data);
    return response;
  }

  async deleteData(role, email, id) {
    const docRef = this.admin
      .collection(this.collection)
      .doc(role)
      .collection(email)
      .doc(id);

    return await docRef.delete();
  }
}

module.exports = new Database();

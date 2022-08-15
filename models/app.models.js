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

  async getDataByRole(role) {
    try {
      const docRef = this.admin.collection(this.collection).doc(role);
      const response = await docRef.listCollections();
      return response;
    } catch (error) {
      return null;
    }
  }

  async getDataByEmail(role, email) {
    try {
      const docRef = this.admin
        .collection(this.collection)
        .doc(role)
        .collection(email);
      const response = await docRef.get();
      if (response.empty) return null;
      return response;
    } catch (error) {
      return null;
    }
  }

  async getDataById(role, email, id) {
    try {
      const docRef = this.admin
        .collection(this.collection)
        .doc(role)
        .collection(email)
        .doc(id);

      const response = await docRef.get();
      if (!response.exists) return null;
      return response;
    } catch (error) {
      return null;
    }
  }

  async updateData(role, email, id, data) {
    try {
      const docRef = this.admin
        .collection(this.collection)
        .doc(role)
        .collection(email)
        .doc(id);

      const response = await docRef.set(data);
      return response;
    } catch (error) {
      return null;
    }
  }

  async deleteDataById(role, email, id) {
    const docRef = this.admin
      .collection(this.collection)
      .doc(role)
      .collection(email)
      .doc(id);
    const response = await docRef.delete();
    return response;
    
  }
}

module.exports = new Database();

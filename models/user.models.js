const { admin } = require("../config/app.config");
// const { DATA } = require("../utils/utils");

class UserModels {
  constructor(collection) {
    this.collection = collection;
    this.admin = admin.firestore();
  }

  async saveData(uid, data) {
    const docRef = this.admin.collection(this.collection).doc(uid);
    const res = await docRef.set(data);
    return res;
  }

  async getData() {
    try {
      const docRef = this.admin.collection(this.collection);
      const response = await docRef.get();
      if (response.empty) return null;
      return response;
    } catch (error) {
      return null;
    }
  }

  async getDataById(uid) {
    try {
      const docRef = this.admin.collection(this.collection).doc(uid);
      const response = await docRef.get();
      if (!response.exists) return null;
      return response;
    } catch (error) {
      return null;
    }
  }

  async updateData(uid, data) {
    try {
      const docRef = this.admin.collection(this.collection).doc(uid);

      const response = await docRef.update(data);
      return response;
    } catch (error) {
      return null;
    }
  }

  async deleteDataById(uid) {
    const docRef = this.admin.collection(this.collection).doc(uid);
    const response = await docRef.delete();
    return response;
  }
}

module.exports = UserModels;

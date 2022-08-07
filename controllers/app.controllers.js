const Database = require("../models/app.models");

async function addDatabase(req, res) {
  try {
    const { uid, email, role } = req.body;
    const date = new Date().toLocaleString();
    const data = {
      uid: uid,
      createdAt: date,
      email: email,
    };
    await Database.saveData(role, data, email);
    data["role"] = role;
    res.status(200).send({ message: "Success", data: data });
  } catch (error) {
    res.send({ message: "Something went wrong" });
    console.log(error);
  }
}

async function getRoleDatabase(req, res) {
  try {
    const { role } = req.body;

    const docRef = await Database.getDataByRole(role);
    const resArr = [];
    const data = {};
    if (docRef.length != 0) {
      docRef.forEach((collection) => {
        data["email"] = collection.id;
        data["role"] = role;
        resArr.push(data);
      });

      res.status(200).send({ message: "Success", data: resArr });
    } else {
      res.status(200).send({ message: "Success", data: null, code: "No Data" });
    }
  } catch (error) {
    res.send({ message: "Something went wrong" });
    console.log(error);
  }
}

async function getData(req, res) {
  try {
    const { role, email } = req.body;
    const id = req.params.id;

    const docRef = await Database.getDataById(role, email, id);
    const resArr = [];
    const data = {};
    if (docRef != null) {
      res.status(200).send({ message: "Success", data: docRef.data() });
    } else {
      res.status(200).send({ message: "Success", data: null, code: "No Data" });
    }
  } catch (error) {
    res.send({ message: "Something went wrong" });
    console.log(error);
  }
}

async function getAllDatabase(req, res) {
  try {
    const { role, email } = req.body;

    const docRef = await Database.getDataByRole(role, email);
    if (docRef == null) {
      res.status(200).send({ message: "Success", data: null, code: "No Data" });
    } else {
      const resArr = [];
      const data = {};
      const results = [];
      docRef.forEach((collection) => {
        data["email"] = collection.id;
        data["role"] = role;
        resArr.push(data);
      });

      const doc = await Database.getDataByEmail(role, data["email"]);
      if (doc != null) {
        doc.forEach((result) => {
          let resData = result.data();
          resData["docId"] = result.id;
          results.push(resData);
        });
        data["results"] = results;

        res.status(200).send({ message: "Success", data: resArr });
      } else {
        res
          .status(200)
          .send({ message: "Success", data: null, code: "No Data" });
      }
    }
  } catch (error) {
    res.send({ message: "Something went wrong" });
    console.log(error);
  }
}

async function updateDatabase(req, res) {
  try {
    const { role, email } = req.body;
    const id = req.params.id;
    const data = {};

    const docRef = await Database.updateData(role, email, id, data);
    if (docRef != null) {
      res.status(200).send({ message: "Success", data: data });
    } else {
      res.status(200).send({
        message: "Success",
        data: null,
        code: "There's no such an Id",
      });
    }
  } catch (error) {
    res.send({ message: "Something went wrong" });
    console.log(error);
  }
}

async function deleteId(req, res) {
  try {
    const { role, email } = req.body;
    const id = req.params.id;
    const doc = await Database.deleteDataById(role, email, id);
    if (doc != null) {
      res.status(200).send({ message: "Success" });
    } else {
      res.status(200).send({
        message: "Success",
        data: null,
        code: "There's no such an Id",
      });
    }
  } catch (error) {
    res.send({ message: "Something went wrong" });
    console.log(error);
  }
}

module.exports = {
  addDatabase,
  getRoleDatabase,
  getAllDatabase,
  getData,
  updateDatabase,
  deleteId,
};

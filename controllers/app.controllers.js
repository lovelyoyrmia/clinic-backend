const Database = require("../models/app.models");
const { admin } = require("../config/app.config");
const auth = admin.auth();

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
    // }
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
    docRef.forEach((collection) => {
      data["email"] = collection.id;
      data["role"] = role;
      resArr.push(data);
    });

    res.status(200).send({ message: "Success", data: resArr });
  } catch (error) {
    res.send({ message: "Something went wrong" });
    console.log(error);
  }
}

async function getAllDatabase(req, res) {
  try {
    const { role, email } = req.body;

    const docRef = await Database.getDataByRole(role, email);
    const resArr = [];
    const data = {};
    const results = [];
    docRef.forEach((collection) => {
      data["email"] = collection.id;
      data["role"] = role;
      resArr.push(data);
    });
    const doc = await Database.getDataByEmail(role, data["email"]);
    doc.forEach((result) => {
      let resData = result.data();
      resData["docId"] = result.id;
      results.push(resData);
    });
    data["results"] = results;

    res.status(200).send({ message: "Success", data: resArr });
    // }
  } catch (error) {
    res.send({ message: "Something went wrong" });
    console.log(error);
  }
}

async function updateDatabase(req, res) {
  try {
    const { role, email } = req.body;
    const id = req.params.id;
    // const data = {

    // };
    const docRef = await Database.updateData(role, email, id, data);

    res.status(200).send({ message: "Success", data: resArr });
    // }
  } catch (error) {
    res.send({ message: "Something went wrong" });
    console.log(error);
  }
}

module.exports = { addDatabase, getRoleDatabase, getAllDatabase };

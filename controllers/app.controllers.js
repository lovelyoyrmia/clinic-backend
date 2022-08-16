const Database = require("../models/app.models");

async function addDatabase(req, res) {
  try {
    const { uid, name, email, address, province, city, option, date, role } = req.body;
    const currentDate = new Date().toLocaleString();
    const data = {
      uid: uid,
      name: name,
      email: email,
      address: address,
	  province: province,
	  city: city,
      option: option,
      appointmentDate: date,
      role: role,
      createdAt: currentDate,
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

async function getEmailData(req, res) {
  try {
    const { role, email } = req.body;

    const docRef = await Database.getDataByEmail(role, email);

    if (docRef != null) {
      const resArr = [];
      docRef.forEach((result) => {
        let resData = result.data();
        resData["docId"] = result.id;
        resArr.push(resData);
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

async function getAllDatabase(req, res) {
  try {
    const { role } = req.body;

    const docRef = await Database.getDataByRole(role);
    if (docRef == null) {
      res.status(200).send({ message: "Success", data: null, code: "No Data" });
    } else {
      const results = [];
      for (let index = 0; index < docRef.length; index++) {
        const data = {};
        const collection = docRef[index];
        data["email"] = collection.id;
        const doc = await Database.getDataByEmail(role, data["email"]);
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
        res
          .status(200)
          .send({ message: "Success", data: null, code: "No Data" });
      } else {
        res.status(200).send({ message: "Success", data: results });
      }
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "Something went wrong" });
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
  getEmailData,
  getData,
  updateDatabase,
  deleteId,
};

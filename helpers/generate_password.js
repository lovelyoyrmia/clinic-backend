const bcryptjs = require("bcryptjs");

function hashPassword(password) {
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(password, salt);
  return hash;
}

function comparePassword(password, hashPassword) {
  return bcryptjs.compareSync(password, hashPassword);
}

module.exports = { hashPassword, comparePassword };

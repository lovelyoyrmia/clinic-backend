const jwt = require("jsonwebtoken");

function generateToken(payload, secretKey, expiresIn) {
  const token = jwt.sign(payload, secretKey, { expiresIn: expiresIn });
  return token;
}

function verifyJwt(token, secretKey) {
  const decoded = jwt.verify(token, secretKey);
  return decoded;
}

module.exports = { signJwt: generateToken, verifyJwt };

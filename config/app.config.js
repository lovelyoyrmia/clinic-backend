const admin = require("firebase-admin");
const service = {
  type: "service_account",
  project_id: "clinic-83bd4",
  private_key_id: process.env.PRIVATE_KEY,
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCzyrygWz+karRU\n0es475xUuxJP4g/GUAc6Igia8ludEa8seEE9nTuT27zxTz0OsKeIcbckID5FglFp\n7Egtl89ptJonFkZTcO5sRLXgWzICPKU7TZIUzM9htt61lyovDw27k91Fjh79NkwQ\nu21SYUY2A1ifr2c3TWXWznYE/5U57cwAgYnBUsRt3/NiqfV3HRgUa8/Q5mOKDwM3\nIPYOJZSiqzhz/RGB8Fc5cEsfQ7ltfOUW5PK8aoXtIVMkopt83rkQBbr7/Mz+pI0B\nVZn/VHzmNgKDIi7jNLIMOykMWt2tz0PoWteysgCInpPhEM8WHOilGxo2lbH9eI7X\nINlPe2TtAgMBAAECggEABgLrFCSA5/8uWOCs7/oo/LdFiTi6hMuztiihp4afdAy9\nkevSaJw7e/neoyXeWYGkFF6S/Ej8tAfDr5o4HpgjFfp1JgXrY4pU2ndgqmf6L9N1\nxdoV3o6rh22dHC65+RlUgPdUcGksVZSNbgjKQrUgaxlpCuvLNHDozQoZrZibFXT0\nsbjCqxiKJe/Kq2yKCkv2FclonGSI7wJPFbQJQh/bXBUpJp84ZYrLuub/79AEZkwj\najjB/vuJ4AnQnsnoB6sEGJwdG7rHMonnU0LTV3GqQ6HGrcXQyOSTPEFA9xORjokJ\n1WPNlgJhnyTw2oU0tPHHd/6/88nZhEZ+Zj4jUbBtCQKBgQD8kvoBvmVMS+AVziVi\nk9mcVpTNxLfhIWwq9/i2uVs5k5V7WgyPj5YIFTKAZvLzptazVNAxsi9V3jIFeZ4c\nggHXtbFvlZv3AzkbfQmBnrat/Z1/6D7RDJYGhgtgBV7w24aTI/9DH4SK2hhR0g0G\nvkSJLFMkuXni/JpccsQ2UloOZQKBgQC2Owkiy+gJljiwqeb6AgS7LfdwlyHEJhL1\nr56ZVCJquJI4nT2GRJPQtc/RG+rBtWmfkFm3Oj5b1Kx1hgnNviLM5Kiee675KzhJ\n3RGyw4LEcmtR2kwgKGp9v1Ekq3H26jj+Dqx8ninLI33RQ/XTA+9W/7iwlbHltj4f\nJWqPrITv6QKBgGnvu6y/jv1RVcvPix6tpLhOGFu2BuoGergLCeaaGAkuPaRfQKV2\nNBdvzJ7Oj1hiweq1yB0P/4qkh5aETCzo2pz/OEz1E1WnpGxDJZmYWEbh+Q2M+8vy\n23og/uRnXErpyKgukQI2VgFnOIwY7h3F8DkYvkbJBLaP/K6J9IJUSDGBAoGAJhMN\npJyP/bjKXXcSUHgtfuJqybZ6Ep6V5YltDMI8cqnfuz53RV98tuXV5u37Tb/WssUZ\nSaQ8tTkpU2DPGZK5eK/p3zseYuc52oz7Dqu03dC+RZrjvvBS17UqggvkQt/LSqHM\nPjlZqBzhQ+D8MrumvTmu4A5W3hUGw8Ewk5ZLLEkCgYApHakYboQwSEcBtt47dvav\nos+6iIjVunDztpnp+5x58zjL2tRF6MDCzoFg54vZ567kC90kENxsbwDooSOmU9NT\nozEQs3ySNVsmnLkwddeMWqZvzwg5YqGsXQh5iuHDQ6GBnETzdFfIKNEKRA4zUJcm\nTA1xbEvpH8lEMgnUO+/+xA==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-txvbc@clinic-83bd4.iam.gserviceaccount.com",
  client_id: process.env.CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.CLIENT_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(service),
});

const PORT = process.env.PORT;

module.exports = { admin, PORT };

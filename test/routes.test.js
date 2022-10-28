const request = require("supertest");
const server = require("../index");
const pathAdmin = "/api/admin/";
const Cookie = require("js-cookie");

describe("Post Endpoints", () => {
  const agent = request.agent(server);
  it("Register New Acc", async () => {
    const res = await agent.post(pathAdmin + "register").send({
      email: "viomokalu",
      password: "12345678",
    });
    if (res.statusCode != 200) {
      expect(res.body["message"]).toEqual("Email already exists");
      expect(res.statusCode).toEqual(400);
    } else expect(res.statusCode).toEqual(200);
  });
  it("Login", async () => {
    const res = await agent.post(pathAdmin + "login").send({
      email: "admin",
      password: "12345678",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
  // it("Refresh Token", async () => {
  //   const res = await request(server).get(pathAdmin + "token");
  //   // expect(res.statusCode).toEqual(200);
  //   expect(Cookie.get("refresh_token")).exist;
  //   expect(res.body).toHaveProperty("data");
  // });
  // it("Logout", async () => {
  //   const res = await request(server).delete(pathAdmin + "logout");
  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body).toHaveProperty("message");
  // });
});

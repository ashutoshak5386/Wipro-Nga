const chai = require("chai");
chai.should();

const request = require("supertest");
const app = require("../index");

describe("User API Integration Tests", () => {
  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "Ashutosh" });

    res.status.should.equal(201);
    res.body.should.have.property("message");
  });
});

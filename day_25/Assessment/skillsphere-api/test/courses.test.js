const chai = require("chai");
chai.should();

const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../index");

describe("Courses API Unit Tests", () => {
  it("should return list of courses", async () => {
    const res = await request(app).get("/api/courses");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.greaterThan(0);
  });
});

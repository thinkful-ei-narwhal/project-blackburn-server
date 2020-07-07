const { expect } = require("chai");
const app = require("../src/app");
const supertest = require("supertest");

describe("App", () => {
  it('should return 200 "Hello world!"', () => {
    return supertest(app).get("/api/").expect(200, { message: "Hello world!" });
  });
});

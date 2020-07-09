const app = require("../src/app");
const supertest = require("supertest");

describe("App", () => {
  // eslint-disable-next-line quotes
  it('should return 200 "Hello world!"', () => {
    return supertest(app).get("/").expect(200, "Hello world!");
  });
});

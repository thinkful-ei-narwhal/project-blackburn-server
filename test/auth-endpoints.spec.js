const jwt = require("jsonwebtoken");
const app = require("../src/app");
const helpers = require("./test-helpers");
const supertest = require("supertest");

describe("Auth endpoints", function () {
  let db;

  const testUsers = helpers.makeUsersArray();
  const testUser = testUsers[0];

  before("make knex instance", () => {
    db = helpers.makeKnexInstance();
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  //Get Login Token

  describe(`POST api/auth/token`, () => {
    beforeEach("insert users", () => helpers.seedUsers(db, testUsers));

    it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
      const userValidCreds = {
        username: testUser.username,
        password: testUser.password,
      };
      const expectedToken = jwt.sign(
        {
          user_id: testUser.id,
          name: testUser.name,
        },
        process.env.JWT_SECRET,
        {
          subject: testUser.username,
          expiresIn: process.env.JWT_EXPIRY,
          algorithm: "HS256",
        }
      );
      return supertest(app)
        .post("api/auth/token")
        .send(userValidCreds)
        .expect(200, {
          authToken: expectedToken,
        });
    });
  });
});

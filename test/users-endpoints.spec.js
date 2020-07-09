const bcrypt = require("bcryptjs");
const app = require("../src/app");
const helpers = require("./test-helpers");
const supertest = require("supertest");
const { expect } = require("chai");

describe("User Endpoints", function () {
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

  describe(`POST /api/users`, () => {
    beforeEach("insert users", () => helpers.seedUsers(db, testUsers));

    describe(`Given a valid user`, () => {
      it(`responds 201, serialized user with no password`, () => {
        const newUser = {
          username: "mytestuser",
          password: "Password1!",
          avatar: "Red Mage",
        };
        return supertest(app)
          .post("api/user")
          .send(newUser)
          .expect(201)
          .expect((res) => {
            expect(res.body).to.have.property("id");
            expect(res.body.username).to.eql(newUser.username);
            expect(res.body.name).to.eql(newUser.name);
            expect(res.body).to.not.have.property("password");
          });
      });

      it(`stores the new user in db with bcryped password`, () => {
        const newUser = {
          username: "test username",
          password: "11AAaa!!",
          name: "test name",
        };
        return supertest(app)
          .post("/api/user")
          .send(newUser)
          .expect((res) =>
            db
              .from("user")
              .select("*")
              .where({ id: res.body.id })
              .first()
              .then((row) => {
                expect(row.username).to.eql(newUser.username);
                expect(row.name).to.eql(newUser.name);

                return bcrypt.compare(newUser.password, row.password);
              })
              .then((compareMatch) => {
                expect(compareMatch).to.be.true;
              })
          );
      });
    });
  });
});

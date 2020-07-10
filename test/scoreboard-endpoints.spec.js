const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");
const supertest = require("supertest");
require("dotenv").config();

describe("Story endpoints", function () {
  let db;

  //todo make fixtures for scoreboard
  // const testUsers = helpers.makeUsersArray();
  // const {
  //   testStory,
  //   testStoryData,
  //   testCheckpoints,
  //   testDifficulty,
  // } = helpers.makeStoryFixtures();

  const testUsers = helpers.makeUsersArray();
  const testUser = testUsers[0];

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.DATABASE_TEST_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  beforeEach("insert users", () => helpers.seedUsers(db, testUsers));

  describe("GET /api/scoreboard", () => {}); //all, story, myscores,sortdate
  describe("GET /api/scoreboard", () => {}); //post
});

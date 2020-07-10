const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");
const supertest = require("supertest");
require("dotenv").config();

describe("Story endpoints", function () {
  let db;

  const testUsers = helpers.makeUsersArray();
  const {
    testStory,
    testStoryData,
    testCheckpoints,
    testDifficulty,
  } = helpers.makeStoryFixtures();

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

  describe("GET /api/story", () => {
    context("No stories in the database", () => {
      it("responds with 200 and an empty list", () => {
        return supertest(app).get("/api/story").expect(200, []);
      });

      context("Stories in the database", () => {
        beforeEach("insert stories and checkpoints", () =>
          helpers.seedStories(
            db,
            testStory,
            testDifficulty,
            testCheckpoints,
            testStoryData
          )
        );

        it("responds with 200 and all of the stories", () => {
          const expectedStories = testStory.map((story) =>
            helpers.makeExpectedStory(story)
          );
          return supertest(app).get("/api/story").expect(200, expectedStories);
        });
      });
    });

    describe("GET /api/story/:story_id?difficulty_setting=easy&checkpoint_id=1", () => {
      context("Given no stories", () => {
        it("responds with 404", () => {
          const storyId = 123456;
          return supertest(app)
            .get(
              `/api/story/${storyId}?difficulty_setting=easy&checkpoint_id=1`
            )
            .expect(404, { error: "Story doesn't exist" });
        });
      });

      context("Given there are stories in the database", () => {
        beforeEach("insert stories and checkpoints", () =>
          helpers.seedStories(
            db,
            testStory,
            testDifficulty,
            testCheckpoints,
            testStoryData
          )
        );

        it("responds with 200 and the specified story checkpoint", () => {
          const storyId = 1;
          const expectedCheckpoint = helpers.makeExpectedStoryCheckpoint(
            testStory[0],
            testDifficulty[0],
            testCheckpoints[0]
          );

          return supertest(app)
            .get(
              `/api/story/${storyId}?difficulty_setting=easy&checkpoint_id=1`
            )
            .expect(200, [expectedCheckpoint]);
        });
      });
    });

    describe("GET /api/story/checkpoint/:story_id?difficulty_setting=easy&checkpoint_id=1", () => {
      context("Given no checkpoints", () => {
        it("responds with 404", () => {
          const storyId = 1;
          return supertest(app)
            .get(
              `/api/story/checkpoint/${storyId}?difficulty_setting=easy&checkpoint_id=1`
            )
            .expect(404, { error: "Story doesn't exist" });
        });
      });

      context("Stories in the database", () => {
        beforeEach("insert stories and checkpoints", () =>
          helpers.seedStories(
            db,
            testStory,
            testDifficulty,
            testCheckpoints,
            testStoryData
          )
        );

        it("responds with 200 and the specified story checkpoint", () => {
          const storyId = 1;
          const expectedCheckpoint = helpers.makeExpectedStoryCheckpointWithId(
            testStory[0],
            testDifficulty[0],
            testCheckpoints[0]
          );

          return supertest(app)
            .get(
              `/api/story/checkpoint/${storyId}?difficulty_setting=easy&checkpoint_id=1`
            )
            .expect(200, [expectedCheckpoint]);
        });
      });
    });
  });
});

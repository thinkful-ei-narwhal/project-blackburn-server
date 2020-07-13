const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const supertest = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('Story endpoints', function () {
  let db;

  const testUsers = helpers.makeUsersArray();

  const {
    testStory,
    testStoryData,
    testCheckpoints,
    testDifficulty,
  } = helpers.makeStoryFixtures();

  const testStats = helpers.makeStatsFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.DATABASE_TEST_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  beforeEach('insert users', () => helpers.seedUsers(db, testUsers));

  describe('GET /api/scoreboard', () => {
    context('No scores in the database', () => {
      it('all responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/scoreboard?userid=1&request=all&storyid=1')
          .expect(200, []);
      });

      it('my scores responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/scoreboard?userid=1&request=myscores&storyid=1')
          .expect(200, []);
      });

      it('Sort date responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/scoreboard?userid=1&request=sortdate&storyid=1')
          .expect(200, { score: [], wpm: [] });
      });
    });

    context('Stories in the database', () => {
      beforeEach('insert stories and checkpoints', () =>
        helpers.seedStories(
          db,
          testStory,
          testDifficulty,
          testCheckpoints,
          testStoryData
        )
      );

      beforeEach('insert stats', () => helpers.seedStats(db, testStats));

      it('responds with 200 and all of the stats', () => {
        return supertest(app)
          .get('/api/scoreboard?userid=1&request=all&storyid=1')
          .expect(200)
          .then((res) => {
            expect(res.body[0]).to.have.property('story_data');
            expect(res.body[0]).to.have.property('total_score');
            expect(res.body[0]).to.have.property('avg_wpm');
            expect(res.body[0]).to.have.property('total_accuracy');
            expect(res.body[0]).to.have.property('user_id');
            expect(res.body[0]).to.have.property('username');
            expect(res.body[0]).to.have.property('avatar');
            return;
          });
      });
      it('responds with 200 and all of the user stats', () => {
        return supertest(app)
          .get('/api/scoreboard?userid=1&request=myscores&storyid=1')
          .expect(200)
          .then((res) => {
            expect(res.body[0]).to.have.property('id');
            expect(res.body[0]).to.have.property('user_id');
            expect(res.body[0]).to.have.property('story_data');
            expect(res.body[0]).to.have.property('total_score');
            expect(res.body[0]).to.have.property('avg_wpm');
            expect(res.body[0]).to.have.property('total_accuracy');
            return;
          });
      });
      it('responds with 200 and all of the stats sorted by date', () => {
        return supertest(app)
          .get('/api/scoreboard?userid=1&request=sortdate&storyid=1')
          .expect(200)
          .then((res) => {
            expect(res.body.score[0]).to.have.property('date_trunc');
            expect(res.body.score[0]).to.have.property('max');
            expect(res.body.wpm[0]).to.have.property('date_trunc');
            expect(res.body.wpm[0]).to.have.property('max');
            return;
          });
      });
    });
  });
  describe('POST /api/scoreboard', () => {
    context('Seeded data base', () => {
      beforeEach('insert stories and checkpoints', () =>
        helpers.seedStories(
          db,
          testStory,
          testDifficulty,
          testCheckpoints,
          testStoryData
        )
      );

      it('Posts the score and responds', () => {
        const postStatsObj = {
          user_id: 1,
          story_data: 1,
          total_score: 150,
          avg_wpm: 3,
          total_accuracy: 50,
        };

        return supertest(app)
          .post('/api/scoreboard')
          .send(postStatsObj)
          .expect(201)
          .then((res) => {
            expect(res.body[0]).to.have.property('id');
            expect(res.body[0]).to.have.property('user_id');
            expect(res.body[0]).to.have.property('story_data');
            expect(res.body[0]).to.have.property('total_score');
            expect(res.body[0]).to.have.property('avg_wpm');
            expect(res.body[0]).to.have.property('total_accuracy');
            return;
          });
      });
    });
  });
});

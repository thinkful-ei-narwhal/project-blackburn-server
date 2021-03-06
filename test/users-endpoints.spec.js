const bcrypt = require('bcryptjs');
const app = require('../src/app');
const helpers = require('./test-helpers');
const supertest = require('supertest');
const { expect } = require('chai');
const knex = require('knex');
require('dotenv').config();

describe('User Endpoints', function () {
  let db;

  const testUsers = helpers.makeUsersArray();
  const [testUser] = testUsers;

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

  describe('POST /api/users', () => {
    beforeEach('insert users', () => helpers.seedUsers(db, testUsers));

    describe('Given a valid user', () => {
      it('responds 201, serialized user with no password', () => {
        const newUser = {
          username: 'mytestuser',
          password: 'Password1!',
          avatar: 'Red Mage',
        };
        return supertest(app)
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect((res) => {
            expect(res.body).to.have.property('id');
            expect(res.body.username).to.eql(newUser.username);
            expect(res.body.name).to.eql(newUser.name);
            expect(res.body).to.not.have.property('password');
          });
      });

      it('stores the new user in db with bcrypted password', () => {
        const newUser = {
          username: 'test username',
          password: '11AAaa!!',
          avatar: 'test name',
        };
        return supertest(app)
          .post('/api/users')
          .send(newUser)
          .expect((res) =>
            db
              .from('users')
              .where({ id: res.body.id })
              .then((row) => {
                expect(row.username).to.eql(newUser.username);
                expect(row.avatar).to.eql(newUser.avatar);
                expect(bcrypt.compare(newUser.password, row.password)).to.be
                  .true;
                return;
              })
          );
      });
    });
  });
  describe('PATCH /api/users/edit', () => {
    beforeEach('insert users', () => helpers.seedUsers(db, testUsers));
    it('Patches an existing user in db', () => {
      const patchUser = {
        username: 'ChunkChuck',
        avatar: 'Red Mage',
      };
      return supertest(app)
        .patch('/api/users/edit')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(patchUser)
        .expect(201)
        .then((res) => {
          expect(res.body[0].username).to.eql(patchUser.username);
          expect(res.body[0].avatar).to.eql(patchUser.avatar);
          return;
        });
    });
  });
});

const knex = require("knex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function makeUsersArray() {
  return [
    {
      username: "test-user-1",
      password: "password",
      avatar: "Red mage",
    },
    {
      username: "test-user-2",
      password: "password",
      avatar: "Red mage",
    },
  ];
}

function makeKnexInstance() {
  return knex({
    client: "pg",
    connection: process.env.DATABASE_TEST_URL,
  });
}

function cleanTables(db) {
  return db.transaction((trx) =>
    trx.raw(
      "TRUNCATE users, difficulty, story, story_checkpoint, story_data, user_stats RESTART IDENTITY CASCADE"
    )
  );
}

function seedUsers(db, users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));
  return db.transaction(async (trx) => {
    await trx.into("users").insert(preppedUsers);

    // await trx.raw(`SELECT setval('id_seq', ?)`, [
    //   users[users.length - 1].id,
    // ]);
  });
}

module.exports = {
  makeUsersArray,
  makeKnexInstance,
  cleanTables,
  seedUsers,
};

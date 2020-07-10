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

function makeStoryArray() {
  return [
    {
      id: 1,
      story_name: "The Pawn Shop Punks",
      story_thumbnail: "image1",
      story_synopsis: "story syn 1",
    },
    {
      id: 2,
      story_name: "Monster Hunter",
      story_thumbnail: "image2",
      story_synopsis: "story syn 2",
    },
    {
      id: 3,
      story_name: "The Drone",
      story_thumbnail: "image3",
      story_synopsis: "story syn 3",
    },
  ];
}

function makeDifficultyArray() {
  return [
    {
      id: 1,
      difficulty_setting: "easy",
      word_length: 5,
      max_screen_words: 5,
      word_expiration_timer: 20,
      level_timer: 60,
      word_gen_timer: 3,
    },
    {
      id: 2,
      difficulty_setting: "medium",
      word_length: 10,
      max_screen_words: 10,
      word_expiration_timer: 10,
      level_timer: 80,
      word_gen_timer: 2,
    },
    {
      id: 3,
      difficulty_setting: "hard",
      word_length: 20,
      max_screen_words: 20,
      word_expiration_timer: 5,
      level_timer: 120,
      word_gen_timer: 1,
    },
  ];
}

function makeCheckpointArray() {
  return [
    {
      id: 1,
      checkpoint_name: "beat 1",
      story_art: "https://image.shutterstock.com",
      story_text: "storyText1",
      win_text: "win1",
      lose_text: "lose1",
      gameplay_art: "https://art",
      music: "music",
      dictionary_string: "animals",
    },
    {
      id: 2,
      checkpoint_name: "beat 2",
      story_art: "https://storyart",
      story_text: "storyText2",
      win_text: "win2",
      lose_text: "lose2",
      gameplay_art: "https://art",
      music: "music",
      dictionary_string: "duqs",
    },
    {
      id: 3,
      checkpoint_name: "beat 3",
      story_art: "https://storyart",
      story_text: "storyText3",
      win_text: "win3",
      lose_text: "lose3",
      gameplay_art: "https://art",
      music: "music",
      dictionary_string: "gucks",
    },
  ];
}

function makeStoryDataArray() {
  return [
    { id: 1, story_id: 1, story_checkpoint_id: 1, difficulty_id: 1 },
    { id: 2, story_id: 1, story_checkpoint_id: 1, difficulty_id: 2 },
    { id: 3, story_id: 1, story_checkpoint_id: 1, difficulty_id: 3 },
  ];
}

function makeStatsFixtures() {
  return [
    {
      id: 1,
      user_id: 1,
      story_data: 1,
      total_score: 150,
      avg_wpm: 3,
      total_accuracy: 50,
    },
  ];
}

function makeStoryFixtures() {
  const testStory = makeStoryArray();
  const testDifficulty = makeDifficultyArray();
  const testCheckpoints = makeCheckpointArray();
  const testStoryData = makeStoryDataArray();
  return { testStory, testDifficulty, testCheckpoints, testStoryData };
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

function seedStories(db, story, difficulty, checkpoints, storyData) {
  return db.transaction(async (trx) => {
    await trx.into("difficulty").insert(difficulty);
    await trx.into("story").insert(story);
    await trx.into("story_checkpoint").insert(checkpoints);
    await trx.into("story_data").insert(storyData);
  });
}

function makeExpectedStory(story) {
  return {
    id: story.id,
    story_name: story.story_name,
    story_thumbnail: story.story_thumbnail,
    story_synopsis: story.story_synopsis,
  };
}

function makeExpectedStoryCheckpoint(story, difficulty, checkpoint) {
  return {
    story_name: story.story_name,
    difficulty_setting: difficulty.difficulty_setting,
    word_length: difficulty.word_length,
    max_screen_words: difficulty.max_screen_words,
    word_expiration_timer: difficulty.word_expiration_timer,
    level_timer: difficulty.level_timer,
    checkpoint_name: checkpoint.checkpoint_name,
    story_art: checkpoint.story_art,
    story_text: checkpoint.story_text,
    win_text: checkpoint.win_text,
    lose_text: checkpoint.lose_text,
    gameplay_art: checkpoint.gameplay_art,
    music: checkpoint.music,
    dictionary_string: checkpoint.dictionary_string,
  };
}

function makeExpectedStoryCheckpointWithId(story, difficulty, checkpoint) {
  return {
    story_name: story.story_name,
    difficulty_setting: difficulty.difficulty_setting,
    word_length: difficulty.word_length,
    max_screen_words: difficulty.max_screen_words,
    word_expiration_timer: difficulty.word_expiration_timer,
    level_timer: difficulty.level_timer,
    checkpoint_name: checkpoint.checkpoint_name,
    story_art: checkpoint.story_art,
    story_text: checkpoint.story_text,
    win_text: checkpoint.win_text,
    lose_text: checkpoint.lose_text,
    gameplay_art: checkpoint.gameplay_art,
    id: checkpoint.id,
    music: checkpoint.music,
    dictionary_string: checkpoint.dictionary_string,
  };
}

function seedStats(db, testStats) {
  return db.transaction(async (trx) => {
    await trx.into("user_stats").insert(testStats);
  });
}

module.exports = {
  makeUsersArray,
  makeStoryFixtures,
  cleanTables,
  seedUsers,
  seedStories,
  makeExpectedStory,
  makeExpectedStoryCheckpoint,
  makeExpectedStoryCheckpointWithId,
  makeStatsFixtures,
  seedStats,
};

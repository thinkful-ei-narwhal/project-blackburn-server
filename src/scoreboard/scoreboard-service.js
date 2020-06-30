const scoreboardService = {
  getAllScores(db) {
    return db.from("scoreboard").select("*").orderBy("score", "desc");
  },
  getStoryScore(db, story_id) {
    return db("scoreboard").where({ story_id });
  },
  getUserScores(db, user_id) {
    return db("scoreboard").where({ user_id });
  },
  postNewScores(db, newScore) {
    return db.insert(newScore).into("scoreboard").returning("id");
  },
};

module.exports = scoreboardService;

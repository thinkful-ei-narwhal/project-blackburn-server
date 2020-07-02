const scoreboardService = {
  getAllScores(db) {
    return db.from('scoreboard')
      .select(
        "scoreboard.date_created", 
        "scoreboard.score",
        "scoreboard.wpm",
        "scoreboard.accuracy",
        "scoreboard.date_created",
        "scoreboard.story_id", 
        "scoreboard.user_id",
        "users.username"
        )
      .join('users', 'users.id', '=', 'scoreboard.user_id')
      .orderBy("score", "desc");
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

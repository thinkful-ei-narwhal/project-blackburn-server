const scoreboardService = {
  getAllScores(db) {
    return db
      .from("user_stats")
      .select(
        "user_stats.date_created",
        "user_stats.story_data",
        "user_stats.total_score",
        "user_stats.avg_wpm",
        "user_stats.total_accuracy",
        "user_stats.user_id",
        "users.username"
      )
      .join("users", "users.id", "=", "user_stats.user_id")
      .orderBy("total_score", "desc");
  },
  getStoryScore(db, story_id) {
    return db("user_stats").where({ story_id });
  },
  getUserScores(db, user_id) {
    return db("user_stats").where({ user_id });
  },
  postNewScores(db, newScore) {
    return db.insert(newScore).into("user_stats").returning("id");
  },
};

module.exports = scoreboardService;

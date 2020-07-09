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
  getMaxScoreByDate(db, user_id) {
    return db.raw(
      `SELECT 
      date_trunc('day', date_created)
      from user_stats
      WHERE user_id = ${user_id}
      GROUP BY date_trunc('day', date_created)
     `
      )

  },
  getMaxWpmByDate(db, user_id) {
    return db.raw(
      `SELECT 
      date_trunc('day', date_created),
      max(avg_wpm) 
      from user_stats
      WHERE user_id = ${user_id}
      GROUP BY date_trunc('day', date_created)`
      )
  },
  postNewScores(db, newScore) {
    return db.insert(newScore).into("user_stats").returning("id");
  },
};

module.exports = scoreboardService;

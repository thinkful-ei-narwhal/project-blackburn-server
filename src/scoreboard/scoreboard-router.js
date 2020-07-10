const express = require("express");
const scoreboardService = require("./scoreboard-service");

const jsonBodyParser = express.json();

const scoreboardRouter = express.Router();

scoreboardRouter.get("/", async (req, res, next) => {
  const db = req.app.get("db");
  const { userid, request, storyid } = req.query;

  try {
    if (request === "all") {
      const allScores = await scoreboardService.getAllScores(db);

      return res.status(201).json(allScores);
    }
    if (request === "story") {
      const storyScore = await scoreboardService.getStoryScore(db, storyid);

      return res.status(201).json(storyScore);
    }
    if (request === "myscores") {
      const id = userid;
      const userScores = await scoreboardService.getUserScores(db, id);

      return res.status(201).json(userScores);
    }
    if (request === "sortdate") {
      const id = userid;
      const userScores = await scoreboardService.getMaxScoreByDate(db, id);
      const userWPM = await scoreboardService.getMaxWpmByDate(db, id);

      return res
        .status(201)
        .json({ score: userScores.rows[0], wpm: userWPM.rows[0] });
    }
    return res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  } catch (error) {
    next(error);
  }
});

scoreboardRouter.post("/", jsonBodyParser, async (req, res, next) => {
  const db = req.app.get("db");
  const {
    user_id,
    story_data,
    total_score,
    avg_wpm,
    total_accuracy,
  } = req.body.data;
  const newScore = {
    user_id,
    story_data,
    total_score,
    avg_wpm,
    total_accuracy,
  };

  try {
    const postnew = await scoreboardService.postNewScores(db, newScore);
    if (postnew) {
      return res.status(201).json(postnew);
    }
    return res.status(400).json({ error: "Score could not be posted" });
  } catch (error) {
    next(error);
  }
});

module.exports = scoreboardRouter;

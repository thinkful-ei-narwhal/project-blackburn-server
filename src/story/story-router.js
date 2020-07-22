const express = require("express");
const StoryService = require("./story-service");

const storyRouter = express.Router();

storyRouter.get("/", async (req, res, next) => {
  const db = req.app.get("db");
  try {
    const startPage = await StoryService.getStartPage(db);

    return res.status(200).json(startPage);
  } catch (error) {
    next(error);
  }
});

storyRouter.get("/:story_id", async (req, res, next) => {
  const db = req.app.get("db");
  const { story_id } = req.params;
  const { difficulty_setting, checkpoint_id } = req.query;
  try {
    const storyById = await StoryService.getStoryByCheckpointId(
      db,
      story_id,
      difficulty_setting,
      checkpoint_id
    );

    if (storyById.length === 0) {
      return res.status(404).json({ error: "Story doesn't exist" });
    }

    return res.status(200).json(storyById);
  } catch (error) {
    next(error);
  }
});

storyRouter.get("/checkpoint/:story_id", async (req, res, next) => {
  const db = req.app.get("db");
  const { story_id } = req.params;
  const { difficulty_setting } = req.query;
  try {
    const storyById = await StoryService.getStoryById(
      db,
      story_id,
      difficulty_setting
    );

    if (storyById.length === 0) {
      return res.status(404).json({
        error: "Story doesn't exist",
      });
    }

    return res.status(200).json(storyById);
  } catch (error) {
    next(error);
  }
});
module.exports = storyRouter;

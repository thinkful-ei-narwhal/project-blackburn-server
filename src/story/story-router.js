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
  const { difficulty_id, checkpoint_id } = req.query;
  try {
    const storyById = StoryService.getStoryById(
      db,
      story_id,
      difficulty_id,
      checkpoint_id
    );
    return res.status(200).json(storyById);
  } catch (error) {
    next(error);
  }
});

//start page grabs ALL of story table
//each INDIVIDUAL story is a GET request for story
//join tables on every reference key

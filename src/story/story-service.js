const StoryService = {
  getStartPage(db) {
    return db.from("story").select("*");
  },

  getStoryByCheckpointId(
    db,
    story_id,
    difficulty_setting,
    story_checkpoint_id
  ) {
    console.log(difficulty_setting);
    return db
      .select(
        "story.story_name",
        "difficulty.difficulty_setting",
        "difficulty.word_length",
        "difficulty.max_screen_words",
        "difficulty.word_expiration_timer",
        "difficulty.level_timer",
        "story_checkpoint.checkpoint_name",
        "story_checkpoint.story_art",
        "story_checkpoint.story_text",
        "story_checkpoint.win_text",
        "story_checkpoint.lose_text",
        "story_checkpoint.gameplay_art",
        "story_checkpoint.music",
        "story_checkpoint.dictionary_string"
      )
      .from("story_data")
      .join("story", "story_data.story_id", "=", "story.id")
      .leftJoin(
        "story_checkpoint",
        "story_data.story_checkpoint_id",
        "=",
        "story_checkpoint.id"
      )
      .leftJoin("difficulty", "story_data.difficulty_id", "=", "difficulty.id")
      .where({ story_id })
      .andWhere({ difficulty_setting })
      .andWhere({ story_checkpoint_id });
  },
  getStoryById(db, story_id, difficulty_setting) {
    console.log(difficulty_setting);
    return db
      .select(
        "story.story_name",
        "difficulty.difficulty_setting",
        "difficulty.word_length",
        "difficulty.max_screen_words",
        "difficulty.word_expiration_timer",
        "difficulty.level_timer",
        "story_checkpoint.checkpoint_name",
        "story_checkpoint.story_art",
        "story_checkpoint.story_text",
        "story_checkpoint.gameplay_art",
        "story_checkpoint.win_text",
        "story_checkpoint.lose_text",
        "story_checkpoint.id",
        "story_checkpoint.music",
        "story_checkpoint.dictionary_string"
      )
      .from("story_data")
      .join("story", "story_data.story_id", "=", "story.id")
      .leftJoin(
        "story_checkpoint",
        "story_data.story_checkpoint_id",
        "=",
        "story_checkpoint.id"
      )
      .leftJoin("difficulty", "story_data.difficulty_id", "=", "difficulty.id")
      .where({ story_id })
      .andWhere({ difficulty_setting })
      .orderBy("checkpoint_name", "asc");
  },
  getAllStoriesByCheckpointName(db, checkpoint_name) {
    return db("story_checkpoint")
      .select("*")
      .where({ checkpoint_name })
      .like(`${checkpoint_name}%`)
      .orderBy("checkpoint_name", "asc");
  },
};

module.exports = StoryService;

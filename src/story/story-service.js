const StoryService = {

  getStartPage(db) {
    return db.from("story").select("*");
  },

   

  getStoryById(db, story_id, difficulty_setting, story_checkpoint_id ) {
    console.log(difficulty_setting)
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
        "story_checkpoint.gameplay_art"
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
      .andWhere({ story_checkpoint_id })
  },
}

module.exports = StoryService

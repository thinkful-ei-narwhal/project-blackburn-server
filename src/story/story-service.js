const StoryService = {
//on GET join story_data on all reference keys

  getStartPage(db) {
    return db
      .from('story')
      .select('*')
  },

  getStoryById(db, story_id, difficulty_id, checkpoint_id ) {
    return db 
      .select(
        'story.name',
        'difficulty.difficulty',
        'difficulty.word_length',
        'difficulty.max_screen_words',
        'difficulty.word_expiration_timer',
        'difficulty.timer_speed',
        'story_checkpoint.checkpoint_name',
        'story_checkpoint.story_art',
        'story_checkpoint.story_text',
        'story_checkpoint.gameplay_art'
        )
      .from('story_data')
      .leftJoin('story_data', 'story_data.story_id', '=', 'story.id')
      .rightJoin('story_data', 'story_data.story_checkpoint_id', '=', 'story_checkpoint.id')
      .outerJoin('story_data', 'story_data.difficulty_id', '=', 'difficulty.id')
      .where({ story_id })
      .andWhere({ difficulty_id })
      .andWhere({ checkpoint_id })
  }
}

module.exports = StoryService
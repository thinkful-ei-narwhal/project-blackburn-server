CREATE TYPE difficulty_level AS ENUM ('easy', 'medium', 'hard');

CREATE TABLE difficulty (
  id SERIAL PRIMARY KEY,
  difficulty_setting difficulty_level,
  word_length INTEGER NOT NULL,
  max_screen_words INTEGER NOT NULL,
  word_expiration_timer INTEGER NOT NULL,
  level_timer INTEGER NOT NULL,
  word_gen_timer INTEGER NOT NULL
);
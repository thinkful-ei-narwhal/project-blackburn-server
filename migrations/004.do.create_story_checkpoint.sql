CREATE TABLE story_checkpoint (
  id SERIAL PRIMARY KEY,
  checkpoint_name TEXT NOT NULL,
  story_art TEXT,
  story_text TEXT NOT NULL,
  win_text TEXT,
  lose_text TEXT,
  gameplay_art TEXT NOT NULL,
  music TEXT,
  dictionary_string TEXT NOT NULL
);
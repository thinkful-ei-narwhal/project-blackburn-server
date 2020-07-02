CREATE TABLE story_checkpoint (
  id SERIAL PRIMARY KEY,
  checkpoint_name TEXT NOT NULL,
  story_art TEXT,
  story_text TEXT NOT NULL,
  gameplay_art TEXT NOT NULL
);
CREATE TABLE story_data (
  id SERIAL PRIMARY KEY,
  story_id INTEGER REFERENCES story (id) ON DELETE SET NULL,
  story_checkpoint_id INTEGER REFERENCES story_checkpoint (id) ON DELETE SET NULL,
  difficulty_id INTEGER REFERENCES difficulty(id) ON DELETE SET NULL
);
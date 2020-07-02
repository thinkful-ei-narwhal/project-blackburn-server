CREATE TABLE story (
  id SERIAL PRIMARY KEY,
  story_name TEXT NOT NULL,
  story_thumbnail TEXT,
  story_synopsis TEXT NOT NULL
);
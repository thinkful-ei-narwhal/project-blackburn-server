CREATE TYPE difficulty AS ENUM ('easy', 'medium', 'hard');

CREATE TABLE scoreboard(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id)
    ON DELETE CASCADE NOT NULL,
  story_id TEXT NOT NULL,
  difficulty_id difficulty,
  score INTEGER NOT NULL,
  wpm INTEGER NOT NULL,
  accuracy INTEGER NOT NULL,
  date_created TIMESTAMPTZ DEFAULT now()
);


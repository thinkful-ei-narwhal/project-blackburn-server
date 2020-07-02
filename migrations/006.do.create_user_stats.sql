CREATE TABLE user_stats (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id) ON DELETE SET NULL,
  story_data INTEGER REFERENCES story_data (id) ON DELETE SET NULL,
  total_score INTEGER NOT NULL,
  avg_wpm INTEGER NOT NULL,
  total_accuracy INTEGER NOT NULL,
  date_created TIMESTAMPTZ  DEFAULT now()
);
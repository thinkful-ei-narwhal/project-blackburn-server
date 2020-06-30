BEGIN;

TRUNCATE
users,
scoreboard;

INSERT INTO users (id, username, password, avatar)
VALUES
  (
    1, 
    'testuser',
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG',
    'Red mage'
  );

  INSERT INTO scoreboard (id, user_id, story_id, difficulty_id, score, wpm, accuracy)
  VALUES
  (123, 1, 'detective', 'easy', 75, 150, 25),
  (124, 1, 'monster', 'easy', 65, 112, 50);
  
  COMMIT;
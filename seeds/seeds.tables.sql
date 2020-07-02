BEGIN;

TRUNCATE
users,
difficulty,
story,
story_checkpoint,
story_data,
user_stats;

INSERT INTO users (id, username, password, avatar)
VALUES (1, 'testuser','$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG','Red mage');

INSERT INTO difficulty (id, difficulty_setting, word_length, max_screen_words, word_expiration_timer, level_timer, word_gen_timer)
VALUES
  (1, 'easy', '5', '5', '20', '60', '3'),
  (2, 'medium', '10', '10', '10', '80', '2'),
  (3, 'hard', '20', '20', '5', '120', '1');

INSERT INTO story (id, story_name, story_thumbnail, story_synopsis)
VALUES (1, 'detective', 'google.com', 'whodunnit? butler prob');
  
INSERT INTO story_checkpoint (id, checkpoint_name, story_art, story_text, gameplay_art)
VALUES
  (1, 'The Call', 'google.com', 'The phone rings. You pick up the reciever it press it to your ear.  On the other line, a breathy voice asks you to find a man known only as the vvolf.  What a dumb name.  You start your research', 'google.com'),
  (2, 'Noir Streets', 'google.com', 'Through your research you find a real name, Duane Reade.  You take to the foggy streets and start asking your usual contacts if they have heard of such a man.  Most point you to the pharmacy, but one man, a homeless man with a missing leg, tells you he knows something about the person.', 'google.com'),
  (3, 'The Chase', 'google.com', 'Your contact tells you about a run down warehouse at a closed off dock. You decide to not waste any time and head over there immediately.  You break through the run down gate, draw your snub-nose revolver and sneak into the warehouse.  There you find Mr.Reade making illegal Aspirin capsule to sell at his own knock-off pharmacy at discounted rates.  A true monster... maybe thats why they call him the vvolf.  You order him to put up his hands, but he runs away.', 'google.com');

INSERT INTO story_data (id, story_id, story_checkpoint_id, difficulty_id)
VALUES
  (1, 1, 1, 1),
  (2, 1, 1, 2),
  (3, 1, 1, 3),
  (4, 1, 2, 1),
  (5, 1, 2, 2),
  (6, 1, 2, 3),
  (7, 1, 3, 1),
  (8, 1, 3, 2),
  (9, 1, 3, 3);

INSERT INTO user_stats (id, user_id, story_data, total_score, avg_wpm, total_accuracy)
VALUES
  (1, 1, 1, 150, 3, 50);

COMMIT;
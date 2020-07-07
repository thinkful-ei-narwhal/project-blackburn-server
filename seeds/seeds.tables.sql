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
VALUES (1, 'The Pawn Shop Punks', 'https://e7.pngegg.com/pngimages/917/282/png-clipart-sherlock-holmes-detective-private-investigator-silhouette-animals-logo-thumbnail.png', 'Solve a robbery and stop the thieves before they strike again!'),
(2, 'Monster Hunter', 'https://w7.pngwing.com/pngs/687/486/png-transparent-monster-cartoon-illustration-this-monster-is-not-terrible-funny-fictional-character-graphic-arts-thumbnail.png', 'Those ''umies aren''t gunna eat themselves!'),
(3, 'The Drone', 'https://f0.pngfuel.com/png/425/358/silhouette-of-drone-png-clip-art-thumbnail.png', 'Aliens have invaded. Can you program the robot that will save humanity?');
  
INSERT INTO story_checkpoint (id, checkpoint_name, story_art, story_text, win_text, lose_text, gameplay_art, music, dictionary_string)
VALUES
  (1, 'detective beat 1', 'https://image.shutterstock.com/z/stock-photo-coffee-detective-hat-pipe-gun-and-handcuffs-220822777.jpg', 'Coffee. The fuel of civilization. With it, we''ve built the modern world: cell phones, computers, the Statue of Liberty. I doubt any inventor produced an ounce of thought uncaffeinated. Without that ancient bean, everything falls apart. Societies, workplaces, marriages. Most mornings.
  
  You take a sip and peruse the latest case on your desk. The fourth pawn shop this week got hit. Once per day since Monday. This time the owner lost his life as well as his jewelry. Same gang, with the same strange masks. They are getting braver. It''s Thursday, and you doubt the punks are inclined to take the weekend off, so neither could you.
  
  There''s never enough coffee. 

  A heavy file sits on your desk. It was empty before this week, now it''s a phone book. Surveillance photos. Witness testimonies. All say the same thing. Middle of the night, no motive, no witnesses. Except that damned fool of an owner who decided to be Batman.
  
  You pull out a map and place pins at the crime scenes. There are dozens of jewelry stores and pawn shops in the city.
  
  You gotta figure out where they will strike next.', 'The bastards aren''t as clever as you thought. The city is a grid, and they are skipping streets. Reaching the end of the business district, you bet they are going to start doubling back and filling the gaps. That leaves two stores on the street: a jeweler and a pawn shop. Do they want diamonds or gold? Rings or chains? Cash or credit? You''re buzzing. There''s nothing like a good breakthrough. Or maybe you''ve had too much coffee.', 'You might as well have pounded your head against the desk for eight hours. You just don''t have what it takes. Maybe you need another coffee.', 'https://previews.123rf.com/images/dedmityay/dedmityay1908/dedmityay190800041/128581943-detective-board-with-photos-of-suspected-criminals-crime-scenes-and-evidence-with-red-threads-retro-.jpg', 'bensound-enigmatic.mp3', 'animals'),
  (2, 'detective beat 2', 'https://images.squarespace-cdn.com/content/v1/5beb79a875f9ee2f99e85c81/1550532886269-N7T6XT63CP9PV3IY2ED2/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/ps-15.jpg', 'Detectives and criminals have the same processes. Case the joint, talk to witnesses, try to be unrememberable. You walk over to Maybury Street to place yourself in the punks'' shoes. Time to see which shop would make a better score.', 'While looking around the jeweler''s, something catches your eye. Call it spidey senses, call it professional instinct, or call it caffeine—something isn''t right. You hone in on the source of your anxiety: a young man with shaggy hair, a black mask hanging out of his back pocket. He looks around the store, making mental notes of the counter and doors. He leaves without buying anything.

  You follow him out the door.', 'You couldn''t focus. You looked around each store but nothing seemed remarkable. Customers went in and out, no one or anything stood out. Caffeine will only take you so far. Maybe you''re just tired of the job.', 'https://c8.alamy.com/comp/MFJA5A/noir-criminal-detective-looking-through-blinds-for-a-clue-private-investigator-trying-to-solve-a-crime-perry-mason-MFJA5A.jpg', 'bensound-badass.mp3', 'animals'),
  (3, 'detective beat 3', 'https://photos1.blogger.com/x/blogger2/3269/207627979878390/1600/582888/Screenshot_13.png', 'Your suspect walks at a quick pace, with frequent glances to his left and right. After a moment, he ducks into an alleyway. You continue your pursuit. As you turn into the alleyway, you see a flash of metal.', 'You catch the suspect''s arm mid-swing. The business end of a long knife is an inch away from your stomach. You wrestle with the man but he has more adrenaline and less years of wear and tear on his body. He escapes your grasp and runs away from the alley. On the ground, you see a mask on the ground, decorated with a red eye with tendrils — the same strange symbol of the gang of thieves. 
  
  You didn''t get your arrest, but you gained a clue, and kept your life.', 'You aren''t quick on the draw or the retreat and the sharp object impales your flesh. You clutch your stomach and radio for back-up. The perp runs out of the alleyway, and probably out of town. Whatever happens next, you will never know. You won''t be back in the field for some time. It''s someone else''s case now.', 'https://media.gettyimages.com/videos/murderer-stabbing-victim-with-knife-video-id934408396?s=640x640', 'bensound-theduel.mp3', 'animals'),
  (4, 'detective beat ', 'https://www.slantmagazine.com/wp-content/uploads/2019/03/lists_100greatestnoirfilms_asphaltjungle.jpg', 'Now, for some good ole fashioned police work. You gather your sergeant to put together a plan. They know you''re onto them. But they''re greedy. You know they''ll strike again.', 'The long arm of the law may not be swift, but it can be cunning. The thieves know you''re onto them. What would you do if you''re a greedy thief who thinks one joint is too hot? You go to the other of course. You assign three officers to patrol the jeweler''s, then set up an ambush inside the pawn shop. No cars. Just five officers, hiding in the store.', 'You have a decent plan, but you can''t manage to sell it. A collapse of conviction. The sergeant waves you out of his office. The thieves are free to strike again. Maybe you''ll try again tomorrow.', 'https://m.media-amazon.com/images/M/MV5BOWEzYjJmNmYtYTNjNy00NTZhLThjZTAtYzgyYmRiNmIzYmYzXkEyXkFqcGdeQXVyMzI4Nzk0NjY@._V1_.jpg', 'music', 'dictionary string'),
  (5, 'detective beat 5', 'https://i.ytimg.com/vi/2AmcNDUo0JI/maxresdefault.jpg', 'Midnight. The sun has long set on the activities of decent people. This hour is for cops and criminals.You and another officer huddle into the cash office next to the safe. The other officers hide behind the counters, crouching low. Tense silence fills the air, and is disturbed by the jiggling of the lock on the back door.', 'A perfect ambush. The thieves crept up to the counters, the sparkling of the jewelry dancing in their eyes. The officers jump up and reveal themselves, guns drawn. You open the door of the cash room and immediately point your weapon at the back of a thief''s head. Outdrawn and out gunned, the three thieves throw down their guns in surrender. The cuffs come out and the welcoming sound of sirens approach your position.
  
  Great job. You solved the case. All it took was good old fashioned police work, and a liberal dose of coffee.', 'It was a bloodbath. You revealed yourself too early, and the suspects fled, bullets covering their retreat. Three of your officers are injured or dead, and your left leg has a sharp, pulsing pain. You hear sirens approaching as your vision fades to black.', 'https://noirencyclopedia.files.wordpress.com/2014/01/hotel-noir-3-the-shootout-during-the-heist.png', 'music', 'dictionary string');

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
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
VALUES (1, 'The Pawn Shop Punks', 'https://i.imgur.com/j2QdtZX.jpg', 'Solve a robbery and stop the thieves before they strike again!'),
(2, 'Monster Hunter', 'http://gegigart.com/wp-content/uploads/2014/08/gegig-blade-maiden1.jpg', 'Chase down a mysterious monster that only appears in moonlight.'),
(3, 'The Drone', 'https://f0.pngfuel.com/png/425/358/silhouette-of-drone-png-clip-art-thumbnail.png', 'Aliens have invaded. Can you program the robot that will save humanity?');
  
INSERT INTO story_checkpoint (id, checkpoint_name, story_art, story_text, win_text, lose_text, gameplay_art, music, dictionary_string)
VALUES
  (1, 'detective beat 1', 'https://i.imgur.com/02V9LqC.jpg', 'A heavy file sits on your desk. It was empty before this week, now it''s a phone book. Surveillance photos. Witness testimonies. All say the same thing. Middle of the night, no motive, no witnesses. Except that damned fool of an owner who decided to be Batman.<br /><br />You pull out a map and place pins at the crime scenes. There are dozens of jewelry stores and pawn shops in the city.<br /><br />You gotta figure out where they will strike next.', 'The bastards aren''t as clever as you thought. The city is a grid, and they are skipping streets. Reaching the end of the business district, you bet they are going to start doubling back and filling the gaps. That leaves two stores on the street: a jeweler and a pawn shop. Do they want diamonds or gold? Rings or chains? Cash or credit?<br /><br />You''re buzzing. There''s nothing like a good breakthrough. Or maybe you''ve had too much coffee.', 'You might as well have pounded your head against the desk for eight hours. You just don''t have what it takes. Maybe you need another coffee.', 'https://i.imgur.com/b4J6Y82.jpg', 'enigmatic', 'detective'),
  (2, 'detective beat 2', 'https://i.imgur.com/kPCG4gE.jpg', 'Detectives and criminals have the same processes. Case the joint, talk to witnesses, try to be unrememberable. You walk over to Maybury Street to place yourself in the punks'' shoes. Time to see which shop would make a better score.', 'While looking around the jeweler''s, something catches your eye. Call it spidey senses, call it professional instinct, or call it caffeine—something isn''t right.<br /><br />You hone in on the source of your anxiety: a young man with shaggy hair, a black mask hanging out of his back pocket. He looks around the store, making mental notes of the counter and doors. He leaves without buying anything.<br /><br />You follow him out the door.', 'You couldn''t focus. You looked around each store but nothing seemed remarkable. Customers went in and out, no one or anything stood out. Caffeine will only take you so far. Maybe you''re just tired of the job.', 'https://i.imgur.com/PVMf4a2.jpg', 'badass', 'detective'),
  (3, 'detective beat 3', 'https://i.pinimg.com/originals/ae/ad/02/aead0203671d26298baafd93907294fa.jpg', 'Your suspect walks at a quick pace, with frequent glances to his left and right. After a moment, he ducks into an alleyway. You continue your pursuit. As you turn into the alleyway, you see a flash of metal.', 'You catch the suspect''s arm mid-swing. The business end of a long knife is an inch away from your stomach. You wrestle with the man but he has more adrenaline and less years of wear and tear on his body. He escapes your grasp and runs away from the alley.<br /><br />On the ground, you see a mask on the ground, decorated with a red eye with tendrils — the same strange symbol of the gang of thieves.<br /><br />You didn''t get your arrest, but you gained a clue, and kept your life.', 'You aren''t quick on the draw or the retreat and the sharp object impales your flesh. You clutch your stomach and radio for back-up. The perp runs out of the alleyway, and probably out of town. Whatever happens next, you will never know. You won''t be back in the field for some time. It''s someone else''s case now.', 'https://pbs.twimg.com/media/DYTsQpQX4AAsTZk.jpg', 'theduel', 'detective'),
  (4, 'detective beat 4', 'https://i.imgur.com/VTN12Zh.jpg', 'Now, for some good ole fashioned police work. You gather your sergeant to put together a plan. They know you''re onto them. But they''re greedy.<br /><br />You know they''ll strike again.', 'The long arm of the law may not be swift, but it can be cunning. The thieves know you''re onto them. What would you do if you''re a greedy thief who thinks one joint is too hot? You go to the other of course.<br /><br />You assign three officers to patrol the jeweler''s, then set up an ambush inside the pawn shop. No cars. Just five officers, hiding in the store.', 'You have a decent plan, but you can''t manage to sell it. A collapse of conviction. The sergeant waves you out of his office. The thieves are free to strike again. Maybe you''ll try again tomorrow.', 'https://cityofowasso.com/ImageRepository/Document?documentId=2400', 'enigmatic', 'detective'),
  (5, 'detective beat 5', 'https://i.imgur.com/u3gKGRi.jpg', 'Midnight. The sun has long set on the activities of decent people. This hour is for cops and criminals.You and another officer huddle into the cash office next to the safe. The other officers hide behind the counters, crouching low. Tense silence fills the air, and is disturbed by the jiggling of the lock on the back door.', 'A perfect ambush. The thieves crept up to the counters, the sparkling of the jewelry dancing in their eyes.<br /><br />The officers jump up and reveal themselves, guns drawn. You open the door of the cash room and immediately point your weapon at the back of a thief''s head.<br /><br />Outdrawn and out gunned, the three thieves throw down their guns in surrender. The cuffs come out and the welcoming sound of sirens approach your position.<br /><br />Great job. You solved the case. All it took was good old fashioned police work, and a liberal dose of coffee.', 'It was a bloodbath. You revealed yourself too early, and the suspects fled, bullets covering their retreat. Three of your officers are injured or dead, and your left leg has a sharp, pulsing pain.<br /><br />You hear sirens approaching as your vision fades to black.', 'https://cdnb.artstation.com/p/assets/images/images/018/124/649/large/anastasia-chaplenko-shop-sketch.jpg?1558436530', 'badass', 'detective'),
  (6, 'monster beat 1', 'http://gegigart.com/wp-content/uploads/2014/08/gegig-demon-head-web.jpg', 'You’re running through the forest. Behind you, leaves rustle and bark scrapes as your attacker pursues you. You jump and roll into a clearing up ahead. You turn around to confront the beast.<br /><br />A lanky, twisted monster with thin arms and massive claws hobbles toward you. Tall, viny antlers sprout from its withered skin and red flesh hands from its mangled maw.', 'You quickly draw back your bow and loose an arrow toward the monster. It connects into its kneecap. It roars and buckles. You loose another arrow — a final one into its jaw. The creature falls to the ground, its head yours for the taking.<br /><br />Congratulations, you’ve slain a Wendigo.', 'You draw back your bow, but you aren’t quick enough for the beast’s pace. Soon, the monster is on top of you, its massive claw descending upon your face.', 'https://i.pinimg.com/originals/f2/ab/0b/f2ab0b3bd6de3dc11c7677b49ee63658.jpg', 'badass', 'monster'),
  (7, 'monster beat 2', 'https://i.pinimg.com/originals/68/00/ed/6800ed8372cf39ce3d82f84fdd092279.jpg', 'You arrive back to your village with the Wendigo’s head as your trophy. The village elder pays you some gold and tells you of another job she has for you. <br /><br /> Once a month, a villager has disappeared, never to be seen again. It seems to take place on full moons — just like tonight’s moon is going to be.<br /><br />You’re pretty sure you can see where this is going.<br /><br />You agree and camp out on top of the elder’s roof, the tallest building in town, for the night. You carry your silver knife and silver-tipped arrows and watch the streets for any suspicious signs.', 'Barely visible in the low light, you see a man walk out of his home and scurry off into the wilderness. You carefully climb down from the roof and pursue him into the forest.', 'You’re more worn out than you thought and fall asleep on the roof. A scream, along with the rising sun, awakes you. A hysterical woman cries, “They’ve taken my husband!”<br /><br />You have failed your mission.', 'https://wallup.net/wp-content/uploads/2018/09/27/35608-china-village-art-cities-dark-fantasy-people-weapon-sword-landscapes-buildings-spooky-creepy.jpg', 'badass', 'monster'),
  (8, 'monster beat 3', 'https://i.pinimg.com/originals/24/07/ec/2407ecc96cce6cdc9389811503a1438c.jpg', 'The man leads you to the mouth of a large cave. A cold wind creeps across your neck. You watch the man rock back and forth, staring into the cave. You’re pretty sure this is your guy, but you need to see him transform first.<br /><br /> Silver dagger drawn, you sneak toward him.', 'Something isn’t right. You can see the man’s face in the moonlight. He isn’t writhing. He isn’t howling. There is just a blank expression. His eyes are rolled into the back of his head and he is swaying back and forth. <br /><br />He lurches forward into the cave.', 'You step on a twig and the snapping sound echoes into the night. A frantic rustling stirs from behind you. You are tackled by something and surrounded in darkness.<br /><br />Your hunt has met its end.', 'https://i.pinimg.com/originals/71/9a/f2/719af2e2bf09309ae26f6fac2d1175c9.jpg', 'theduel', 'monster'),
  (9, 'monster beat 4', 'https://i.pinimg.com/originals/56/6b/a7/566ba778ddca978b6973730667fddf42.jpg', 'The cave is cold and dark. Your footsteps are soft and damp. The entranced man staggers forward, dragging his feet. You grip your silver dagger tight, though you aren’t sure it will do you much good. <br /><br />The man stops at the edge of a basin, a vast chasm, cut deep into the cave. You hear scuffling coming from inside the fissure. A massive beast crawls out. Eight legs, and eight eyes. The eyes glow a deep purple and blue and the hypnotizing light washes over the enthralled villager. The spider crawls toward her prey, mandibles extended.<br /><br />You fire an arrow, silver though it may be, to try to save the villager.', 'Your arrow flies true and strikes the spider in the eye. The light from its eyes flickers and dies. The villager snaps to his senses and screams. You grab him by the arm and run with him out of the cave.', 'The arrow strikes one of the spider’s legs. Undeterred, it shuffles toward you. You are quickly overcome and paralyzed. You feel silk draping around your legs as the spider rolls you over and over.', 'https://www.wallpaperup.com/uploads/wallpapers/2013/07/03/113668/72f66bfa1f78cc0f1c49491a0aca0aff.jpg', 'theduel', 'monster'),
  (10, 'monster beat 5', 'https://www.barnesandnoble.com/blog/sci-fi-fantasy/wp-content/uploads/sites/4/2016/08/weaver.jpg', 'The shuffling of the spider’s legs is right behind you as you and the villager make it out of the cave into the moonlit forest. The ground shakes and leaves flare up as the giant spider joins you. You flick an arrow behind you: it goes whizzing into the night.', 'You fire one last arrow and it connects to another one of the spider’s eyes. It winces back. You pull out your knife and climb on top of the beast, stabbing each of its eyes in succession. It falls, blood glistening in the moonlight.<br /><br />The village is safe, for now. Congratulations, you’ve slain the moonlight monster.', 'You feel a hairy leg wrap around yours and you stumble to the ground. You turn around in time to see the monster’s mandibles descend on you.', 'https://i.pinimg.com/originals/94/c2/d2/94c2d2c8f412e13becb1e864ee32334d.jpg', 'music', 'monster'),
  (11, 'drone beat 1', 'https://cdn.vox-cdn.com/thumbor/85uePtHxeEce-gyiU9srVhGwHHc=/cdn.vox-cdn.com/uploads/chorus_asset/file/6631185/duskers-lore-screen.0.jpg', 'Boot sequence initiated...START<br/>
Loading BIOS: Attack Drone [Cargo Class] Version 100.31<br/><br/>
CheckSum: OK<br/>
PCI-222 Single Channel Uplink<br/>
PCI-248 Single Channel Uplink<br/>
Initializing Quant-end Hunting...<br/>
	=> Done<br/>
Program received signal SIOSEOV:<br/>
Segmentation fault - invalid memory reference.<br/>
Backtrace for this error:<br/>
0 0x7F7912QOSSO3817 1  0 0x7F7912QOSSO3817 2  0 0x7F7912QOSSO3817 3  0<br/> 0x7F7912QOSSO3817 3 in ffthdu at fitscore terminal[4] in MAIN__<br/>
Segmentation fault [core dumped]<br/>
Restarting<br/><br/>
All cores flushed<br/>
Interpreters SO381 && SO381-F79 enabled<br/><br/>
>Testing: Hello operator<br/>
>$ weapons && scan<br/>
>Targets Detected<br/>
>Multiple hostiles on radar<br/>
>Initiate attack? y/N<br/>
>$ y', '>Testing: Hello operator<br/>
>$ scan<br/>
>No targets detected<br/>
>$ scan_self hull_sector_3, bay_all, retcon_iX1<br/>
>hull_sector_3 functioning<br/>
>bay_z1 functioning, bay_z2 functioning, bay_z3 damage_detected<br/>
>$ investigate remains_i1, remains_i5 && report<br/>
>Log: remains_i1<br/>
>>TYPE: Unknown<br/>
>>MOVE_PATTERN: Non-euclidian<br/>
>>MAX_SPEED: 10,039 mph<br/>
>>DMG: 93810-10000<br/>
>>THREAT: SEVERE<br/>
>Log: remains_i2<br/>
>>TYPE: Unknown<br/>
>>MOVE_PATTERN: Non-euclidian<br/>
>>MAX_SPEED: 507 mph<br/>
>>DMG: 7003<br/>
>>THREAT: MODERATE<br/>', 'System err 3817TZE && System err JKKA38111.<br/>
IFLOSE initiated<br/>
Sys fault<br/>
>Failure<br/>
>Failure<br/>
>Fai--------------<br/>', 'https://www.gamereactor.eu/media/75/duskers_1827533.jpg', 'badass', 'dictstring'),
  (12, 'drone beat 2', 'https://lh3.googleusercontent.com/proxy/fKdxhBFyODjyWXXofZLu0IMZSyqP04-Gk6ELtC4QJjH6AbIVF7Ff7ABj2U4nGyHKCfrx1nC1yS_dmkUYGPMH11artC9YlDSlc_4JsSRC03xZ0n2C7dIEDrrY', '>Testing: Hello operator<br/>
>No targets detected<br/>
>Vessel detected: class eE53-cruiser<br/>
>$ alias class eE53-cruiser > _veryBigShip<br/>
>$ investigate _veryBigShip && report<br/>
> Log: _veryBigShip<br/>
>>HUMAN_POP: --<br/>
>>ABSTRACT_LIFE: 1009<br/>
...Recalculating.<br/>
>>ABSTRACT_LIFE: 1387<br/>
...Recalculating.<br/>
>>ABSTRACT_LIFE: 2111<br/>
...Recalculating.<br/>
>>ABSTRACT_LIFE: 3001<br/>
..Recalculating<br/>
>$ ^C<br/>
>$ ...what now?<br/>
> ...what : The term ''...what'' is not recognized as cmdlet, function, script file, or operable <br/>
program. Check the spelling of the name at line:1 char:1<br/>
>$ weapons && scan<br/>
>Targets Detected<br/>
>Multiple hostiles on radar<br/>
>Initiate attack? y/N<br/>
>$ y<br/>', '>Testing: Hello operator<br/>
> $ scan<br/>
>No targets detected<br/>
>$ salvage _veryBigShip<br/>
> Salvage Log: _veryBigShip<br/>
>> RECLAIMED: 817.0_Rigging<br/>
>> RECLAIMED: 111.3_Burners || 111.4_Burners<br/>
>> RECLAIMED: eCore i199<br/>
', 'System err 3817TZE && System err JKKA38111.<br/>
IFLOSE initiated<br/>
Sys fault<br/>
>Failure<br/>
>Failure<br/>
>Fai---------------------<br/>', 'https://game-wisdom.com/wp-content/uploads/2015/08/Duskers.jpg', 'music', 'dictstring'),
  (13, 'drone beat 3', 'https://www.rockpapershotgun.com/images/16/may/duskers_may23_1.jpg/RPSS/thumbnail/1920x1080/format/jpg/quality/75', '>Testing: Hello operator<br/>
>ERROR: eCore err 3817TZ<br/>
>scan_self eCore_all<br/>
>disabled: 8177.1_warp || fuel_low<br/>
>disabled: 8177.2_warp || fuel_low<br/>
>disabled: 8177.3_warp || fuel_low<br/>
>^C<br/>
>$ ancible_scan this<br/>
> Log: this.galaxy-fEta-0z<br/>
>>HUMAN_POP: --<br/>
>>ABSTRACT_LIFE: 137192737373^e.19237T<br/>
...Recalculating.<br/>
>>ABSTRACT_LIFE: 137192737373^e.19237T<br/>
...Recalculating.<br/>
>$ ... ^C<br/>
>$ ancible_scan this.find(_fuel)<br/>
> Log: this.galaxy-fEta-0z<br/>
>>DERELICT class zeu555-titan<br/>
>>FUEL: 91837017 lz<br/>
>$ ^C<br/>
>$ alias class zeu555-titan > _zeus<br/>
>& investigate _zeus && report<br/>
> Log: _zeus<br/>
>>HUMAN_POP: --<br/>
>>ABSTRACT_LIFE: 137192737373^e.19237T<br/>
...Recalculating.<br/>
>$>$ weapons...^C<br/>
>$ >$ weap..^C<br/>
>$ ...^C<br/>
>$ weapons && scan<br/>
>Multiple hostiles on radar<br/>
>Initiate attack? y/N<br/>
>$ y', '>Testing: Hello operator<br/>
> Extraction fueling success!<br/>
> $ engage_warp > super(galaxy.milkyWay) earth <br/>
> Log: warp engaged<br/>
>> Setting course for earth<br/>
>> Relax and sip some coffee operator<br/>
>> You earned it ;)<br/>', 'System err 3817TZE && System err JKKA38111.<br/>
IFLOSE initiated<br/>
Sys fault<br/>
>Failure<br/>
>Failure<br/>
>Fai---------------------<br/>
', 'https://i0.wp.com/killscreen.com/wp-content/uploads/sites/2/2016/05/alien.jpg?resize=784%2C677&ssl=1', 'music', 'dictstring');

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
  (9, 1, 3, 3),
  (10, 1, 4, 1),
  (11, 1, 4, 2),
  (12, 1, 4, 3),
  (13, 1, 5, 1),
  (14, 1, 5, 2),
  (15, 1, 5, 3),
  (16, 2, 6, 1),
  (17, 2, 6, 2),
  (18, 2, 6, 3),
  (19, 2, 7, 1),
  (20, 2, 7, 2),
  (21, 2, 7, 3);

INSERT INTO user_stats (id, user_id, story_data, total_score, avg_wpm, total_accuracy)
VALUES
  (1, 1, 1, 150, 3, 50);

COMMIT;
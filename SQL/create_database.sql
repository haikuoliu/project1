-- ***************   Entity     ***************
--users
CREATE TABLE users(
    uid serial primary key,
    reg_t timestamp NOT NULL,
    birth date CHECK( birth < now()),
    password text NOT NULL,
    email text NOT NULL UNIQUE CHECK (email ~ '^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$'),
    name text NOT NULL,
    sex bool DEFAULT true
);

--events
CREATE TYPE valid_event_type AS ENUM ('blog', 'picture');
CREATE TABLE events(
    eid serial primary key,
    time timestamp NOT NULL,
    event_type valid_event_type NOT NULL,
    description text DEFAULT '',
    uid int NOT NULL references users,
    url text,
    title text,
    content text,

    CONSTRAINT blog_picture_check CHECK (
        (event_type = 'picture' and url is not null) or
        (event_type = 'blog' and title is not null and content is not null)
    )
);

--topics
CREATE TABLE topics(
    name text primary key,
    description text DEFAULT 'No description'
);

-- ***************   RelationShip     ***************
--follows
CREATE TABLE follows(
    source int references users(uid),
    destination int references users(uid),
    primary key (source, destination),
    CHECK(source <> destination)
);

--comments
CREATE TABLE comments(
    uid int references users,
    eid int references events ON DELETE CASCADE,
    time timestamp,
    content text DEFAULT '',
    primary key (uid, eid, time)
);

--likes
CREATE TABLE likes(
    uid int references users,
    eid int references events ON DELETE CASCADE,
    primary key (uid, eid)
);

--subscribes
CREATE TABLE subscribes(
    uid int references users,
    topic text references topics(name) ON DELETE CASCADE,
    primary key (uid, topic)
);

--belongs
CREATE TABLE belongs(
    eid int references events ON DELETE CASCADE,
    topic text references topics(name) ON DELETE CASCADE,
    primary key (eid, topic)
);

-- *************** Advertising **********************
--sponsors
CREATE TABLE sponsors(
    sid serial primary key,
    name text NOT NULL
);

--ads
CREATE TABLE ads(
    aid serial primary key,
    sid int NOT NULL references sponsors ON DELETE CASCADE,
    url text NOT NULL,
    description text
);

--user_sets
CREATE TABLE user_sets(
    set_id serial primary key,
    filters text NOT NULL,
    description text DEFAULT 'No description',
    size int,
    sid int NOT NULL references sponsors ON DELETE CASCADE
);

--pushes
CREATE TABLE pushes(
    sid int references sponsors ON DELETE CASCADE,
    aid int references ads ON DELETE CASCADE,
    set_id int references user_sets ON DELETE CASCADE,
    time timestamp,
    price float NOT NULL CHECK(price >= 0),
    count int NOT NULL CHECK(count >= 0),
    primary key (sid, aid, set_id, time)
);

CREATE TABLE user_ads(
    uid int references users,
    aid int references ads ON DELETE CASCADE,
    count int NOT NULL,
    primary key (uid, aid)
);

--insert
INSERT INTO users(reg_t, birth, password, email, name, sex) VALUES
--lllhhhkkk
(now() - interval'1day','1993-7-12','e9758b9daa55928e4807873586675118','haikuo.liu.cu@gmail.com','HaikuoLiu',true),
--zh1234
(now() - interval'33day','1994-6-18','651d7b1f39ca2dc2db47278eb70087c3','ZehaoSong@gmail.com','ZehaoSong',true),
--benjam123
(now() - interval'22day','1996-1-30','0df08098440972a832d1474ae847d0fa','BenjaminMackenzie@hotmail.com','BenjaminMackenzie',true),
--AndrewW
(now() - interval'111day','1993-4-1','f62b0dbdd7326921acf9a13920cbbef7','AndrewWallace@163.com','AndrewWallace',true),
--bbbbbjjjjj
(now() - interval'133day','1990-5-3','a3efbed0d175394b943234b6e9a9ae52','BrandonJones@126.com','BrandonJones',true),
--mgibson
(now() - interval'14day','1991-7-4','fc87b69c76eac4e405c7d6736cdbda3e','MollyGibson@gmail.com','MollyGibson',false),
--bernadettehud
(now() - interval'88day','1983-8-9','d5b5944ca5c318dcbe0ab5b809c18d4c','BernadetteHudson@hotmail.com','BernadetteHudson',false),
--carolyn
(now() - interval'12day','2001-12-12','f08e6e39297757fbe383409944382599','CarolynArnold@hotmail.com','CarolynArnold',false),
--donnablake
(now() - interval'99day','1970-1-18','f9b4b7eb02e1f9ed5f5fe092f5bb79cc','DonnaBlake@gmail.com','DonnaBlake',false),
--TraceyColumbia
(now() - interval'134day','1991-3-23','c0027d2f4be5d62b402f58579c3d2286','TraceyGraham@columbia.edu','TraceyGraham',false),
--mydavid!
(now() - interval'124day','1995-6-29','049eed3423b1a54ee4745bb035e2c58c','DavidPiper@outlook.com','DavidPiper',true);


INSERT INTO events(time, event_type, description, uid, url, title, content) VALUES
(now() - interval'1day', 'blog', 'Its what we do with technology that judges us - John Goodenough, who helped invent the battery in our mobile phones.', 2, null, 'Phone battery inventor decries ills of mobiles','The man whose work made mobile phones possible says he does not have one himself and dislikes the way people use them.John Goodenoughs work led to the invention of the rechargeable lithium-ion battery, which is part of almost every portable electronic device.'),
(now() - interval'33day', 'blog', 'Whats your opinion?', 3, null, 'Will virtual reality ever dodge sensory reality of mankind?', 'I have a friend whose been in the room with discerning and demanding design clients like Steve Jobs. Today, coincidentally, he was gushing about Chris Jones - he called him a demigod. Here is something he built by hand. I believe this level of craftsmanship - rendered on an 8K wraparound display - would probably fake me out.'),
(now() - interval'22day', 'blog', 'Refers to the title!', 4, null, 'Who is the best selling artist of all time?','The Beatles- more number 1 hits than anyone .total of 2.3 billion total sells. 1 member is alive. 1 was killed n the 80s. They all British.'),
(now() - interval'44day', 'picture', 'Harvard', 5, 'http://atlantablackstar.com/wp-content/uploads/2015/12/a-man-was-spotted-at-harvard-soliciting-donations-for-isis.jpg', null,null),
(now() - interval'22day', 'picture', 'this is Columbia University!', 4, 'http://gsas.columbia.edu/sites/default/files/slides/GSAS-Slide01.jpg', null,null),
(now() - interval'33day', 'picture', 'Lets swim!', 3, 'http://www.indianworkouts.com/wp-content/uploads/2015/02/Woman-swimming-in-a-pool.jpg', null,null),
(now() - interval'22day', 'picture', 'come and play footbaoll', 1, 'http://www.clipartbest.com/cliparts/7Ta/oy5/7Taoy5jEc.png', null,null),
(now() - interval'11day', 'picture', 'What a lovely bird!', 10, 'https://en.wikipedia.org/wiki/Red-crested_turaco#/media/File:RedcrestedTuraco.jpg', null,null),
(now() - interval'66day', 'picture', 'Hawaii', 9, 'https://www.ncl.com/sites/default/files/DestinationGalleries.Hawaii.SnorkelingBay900x400.jpg', null,null),
(now() - interval'77day', 'picture', 'This movie is really good!', 1, 'http://www.getmemedia.com/content/5860/Live/image/Screen%20with%20Ident%20frame.jpg', null,null),
(now() - interval'123day', 'picture', 'See my new Google glass!', 2, 'http://www.dispatch.com/content/graphics/2014/01/03/1aa-abuzz03-art-g2rqdlh3-1exchange-eye-on-the-future-jpeg-05671.jpg', null,null),
(now() - interval'14day', 'picture', 'Kobe, my favorite star.', 2, 'http://hotcountry1035.com/wp-content/uploads/2016/04/kobe-b.jpg', null,null);


INSERT INTO topics(name, description) VALUES
    ('music', 'Vocal or instrumental sounds (or both) combined in such a way as to produce beauty of form, harmony, and expression of emotion'),
    ('travel', 'Make a journey, typically of some length or abroad'),
    ('food', 'Any nutritious substance that people or animals eat or drink, or that plants absorb, in order to maintain life and growth'),
    ('movie', 'A story or event recorded by a camera as a set of moving images and shown in a theater or on television'),
    ('science', 'The intellectual and practical activity encompassing the systematic study of the structure and behavior of the physical and natural world through observation and experiment'),
    ('sports', 'An activity involving physical exertion and skill in which an individual or team competes against another or others for entertainment'),
    ('technology', 'The application of scientific knowledge for practical purposes, especially in industry'),
    ('health', 'The state of being free from illness or injury'),
    ('education', 'The process of receiving or giving systematic instruction, especially at a school or university'),
    ('shopping', 'The purchasing of goods from stores'),
    ('history', 'The study of past events, particularly in human affairs')
 ;


INSERT INTO follows(source, destination)VALUES
(1,2),
(2,1),
(3,4),
(3,5),
(3,6),
(4,5),
(4,7),
(5,8),
(6,7),
(6,8),
(1,7),
(4,9),
(8,9);

INSERT INTO comments(uid, eid, time, content) VALUES
(10, 1, now() - interval'23hour', 'Great Idear~~ Love you~~~'),
(2, 1, now() - interval'22hour', 'Thank you~'),
(10, 1, now() - interval'21hour', 'Looking forward to the next blog! Fighting..'),
(5, 2, now() - interval'10day', 'I have nothing to say'),
(6, 3, now() - interval'11day', 'Haha~~~'),
(7, 4, now() - interval'1day', 'I wish to study there in the future'),
(5, 4, now() - interval'1hour', 'Dream will come true!'),
(8, 5, now() - interval'1day', 'Are you a student at Columbia?'),
(4, 5, now() - interval'1hour', 'Yes. I am in Teacher colledge~'),
(8, 5, now() - interval'58min', 'Woo~ We are classmates'),
(4, 5, now() - interval'50min', 'Ahh! '),
(10, 5, now() - interval'10day', 'hehehehe!');


INSERT INTO likes(uid, eid)VALUES
	(1,2),
	(1,4),
	(1,5),
	(2,4),
	(2,3),
	(3,4),
	(3,5),
	(3,7),
	(4,1),
	(4,2),
	(4,3),
	(4,4)
;


INSERT INTO subscribes(uid, topic) VALUES
(1, 'science'),
(2, 'science'),
(3, 'science'),
(4, 'shopping'),
(1,'technology'),
(2,'technology'),
(3,'technology'),
(5,'food'),
(6,'travel'),
(7,'education'),
(8,'sports'),
(9,'sports'),
(10,'health'),
(8,'music'),
(11,'music')
;

INSERT INTO belongs(eid, topic)VALUES
(1,'technology'),
(1,'science'),
(1,'health'),
(2,'technology'),
(2,'science'),
(3,'music'),
(4,'education'),
(5,'education'),
(6,'sports'),
(7,'sports'),
(8,'travel'),
(9,'travel'),
(10,'movie'),
(11,'technology'),
(12,'sports');


INSERT INTO sponsors(name) VALUES
('Apple'),
('Stock Exchange'),
('Google'),
('Facebook'),
('Airbnb'),
('TwoSigma'),
('Nike'),
('microsoft'),
('Snapchat'),
('Baidu'),
('Alibaba'),
('Lining');


INSERT INTO ads(sid, url, description)VALUES
(1,'http://store.storeimages.cdn-apple.com/4973/as-images.apple.com/is/image/AppleInc/aos/published/images/M/AC/MACBOOKPRO/MACBOOKPRO?wid=1200&hei=630&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=jBFkr3','New Mackbook pro'),
(1,'http://www.apple.com/macbook-air/images/overview_wireless_hero_enhanced.png','New Macbook air'),
(1,'http://blog.syncios.com/wp-content/uploads/2015/12/517x329xiphone-5s.jpg.pagespeed.ic.V5enAu1Myz.jpg','iPhone2016'),
(1,'https://i5.walmartimages.com/asr/82ddcd9b-a41d-42c1-b0d4-a7d225489ba8_1.f9c2219c4f7d54dec3ba683ca0d6d61a.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF','iPad'),
(1,'http://cdn.macrumors.com/article-new/2013/09/27inchimacdisplay.jpg','iMac'),
(1,'http://cdn1.knowyourmobile.com/sites/knowyourmobilecom/files/2016/05/siri_0.jpg','siri'),
(7,'http://guides.wiggle.co.uk/sites/default/files/styles/770x480crop/public/hero/nike-free-5-0-shoes-ho14-hero.jpg?itok=oJDui7I4','new shoes 2016'),
(7,'http://images.sportsdirect.com/images/imgzoom/59/59520401_xxl.jpg','nice t-shirt'),
(8,'https://dri1.img.digitalrivercontent.net/Storefront/Company/msintl/images/English/en-INTL-Office-2016-Home-Student-79G-04287/en-INTL-L-Office-2016-Home-Student-79G-04287-mnco.jpg','MS Office'),
(3,'https://www.wired.com/images_blogs/gadgetlab/2014/01/20140124-GOOGLE-GLASS-FRAMES-0018.jpg','Google Glass'),
(8,'http://compass.xbox.com/assets/23/0d/230dc52a-8f0e-40bf-bbd1-c51fdb8371e3.png?n=Homepage-360-UA_Upgrade-big_1056x594.png','Xbox'),
(8,'http://windowsitpro.com/site-files/windowsitpro.com/files/uploads/2014/12/win10.jpg','Windows10')
;


INSERT INTO user_sets(filters, description, sid, size) VALUES
('{"age":[18,30],"sex":""}', 'Young People', 1, 5),
('{"age":[30,50],"sex":""}', 'Middle Aged', 1, 6),
('{"subscribe_topics":["technology","shopping"],"age":[0,25],"sex":""}', 'Young Users who might be interested in purchase new phone', 1, 2),
('{"post_topics":["technology"],"keywords":["iphone"],"age":[0,100],"sex":""}', 'Bloggers who have posted articles about iphone', 1, 3),
('{"active_within":["30day"],"age":[18,30],"sex":"male"}','Active Male Customs', 1, 4),
('{"active_within":["30day"],"age":[18,30],"sex":"female"}','Active Female Customs', 1, 5),
('{"subscribe_topics":["sports"],"age":[18,30],"sex":"male"}','Potential Male Customs', 7, 6),
('{"subscribe_topics":["sports"],"age":[18,30],"sex":"female"}','Potential Female Customs', 7, 7),
('{"reg_time":["3year","1year"],"age":[0,100],"sex":""}', 3, 8),
('{"email":"@gmail.com$","age":[0,100],"sex":""}', 3, 1)
;

-- INSERT INTO user_sets(filters, description, sid, size) VALUES
-- ('{"age":[18, 30],"sex":"male"}', 'Young People', 1, 5),
-- ('{"age":[30,50],"sex":""}', 'Middle Aged', 1, 6),
-- ('{"subscribe_topics":["technology","shopping"],"age":[0,25],"sex":""}', 'Young Users who might be interested in purchase new phone', 1, 2),
-- ('{"post_topics":["technology"],"keywords":["iphone"],"age":[0,100],"sex":""}', 'Bloggers who have posted articles about iphone', 1, 3),
-- ('{"active_within":["30day"],"age":[18,30],"sex":"male"}','Active Male Customs', 1, 4),
-- ('{"active_within":["30day"],"age":[18,30],"sex":"female"}','Active Female Customs', 1, 5),
-- ('{"subscribe_topics":["sports"],"age":[18,30],"sex":"male"}','Potential Male Customs', 7, 6),
-- ('{"subscribe_topics":["sports"],"age":[18,30],"sex":"female"}','Potential Female Customs', 7, 7),
-- ('{"reg_time":["3year","1year"],"age":[0,100],"sex":""}', 3, 8),
-- ('{"email":"@gmail.com$","age":[0,100],"sex":""}', 3, 1)
-- ;

INSERT INTO pushes( sid, aid, set_id, time, price, count)VALUES
(1, 1, 1, now() - interval'2hour', 1, 1000),
(1, 2, 1, now() - interval'44hour', 1, 2000),
(1, 3, 3, now() - interval'88hour', 2, 3000),
(1, 4, 1, now() - interval'666hour', 2, 400),
(1, 5, 1, now() - interval'2day', 2, 5000),
(1, 3, 4, now() - interval'4day', 3, 6000),
(7, 7, 7, now() - interval'100day', 2, 700),
(7, 8, 8, now() - interval'3day', 1, 8000),
(3, 10, 9, now() - interval'40day', 1, 80),
(3, 10, 10, now() - interval'1min', 2, 900)
;

INSERT INTO user_ads(uid, aid, count) VALUES
(1,3,4),
(1,2,5),
(2,1,3),
(3,3,4),
(5,3,5),
(6,5,3),
(7,8,4),
(8,3,2),
(4,6,1),
(2,7,1),
(1,8,1)
;

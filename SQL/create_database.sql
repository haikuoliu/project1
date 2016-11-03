-- ***************   Entity     ***************
--users
CREATE TABLE users(
    uid serial primary key,
    reg_t timestamp NOT NULL,
    birth date CHECK( birth < now()),
    password char(16) NOT NULL,
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
    eid int references events,
    time timestamp,
    content text DEFAULT '',
    primary key (uid, eid, time)
);

--likes
CREATE TABLE likes(
    uid int references users,
    eid int references events,
    primary key (uid, eid)
);

--subscribes
CREATE TABLE subscribes(
    uid int references users,
    topic text references topics(name),
    primary key (uid, topic)
);

--belongs
CREATE TABLE belongs(
    eid int references events,
    topic text references topics(name),
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
    sid int NOT NULL references sponsors,
    url text NOT NULL,
    description text
);

--user_sets
CREATE TABLE user_sets(
    set_id serial primary key,
    filters text NOT NULL,
    description text DEFAULT 'No description',
    sid int NOT NULL references sponsors
);

--pushes
CREATE TABLE pushes(
    sid int references sponsors,
    aid int references ads,
    set_id int references user_sets,
    time timestamp,
    price float NOT NULL CHECK(price >= 0),
    count int NOT NULL CHECK(count >= 0),
    primary key (sid, aid, set_id, time)
);

CREATE TABLE user_ads(
    uid int references users,
    aid int references ads,
    count int NOT NULL,
    primary key (uid, aid)
);

--insert
INSERT INTO users(reg_t, birth, password, email, name, sex) VALUES
(now() - interval'1day','1993-7-12','lllhhhkkk','haikuo.liu.cu@gmail.com','HaikuoLiu',true),
(now() - interval'33day','1994-6-18','zh1234','ZehaoSong@gmail.com','ZehaoSong',true),
(now() - interval'22day','1996-1-30','benjam123','BenjaminMackenzie@hotmail.com','BenjaminMackenzie',true),
(now() - interval'111day','1993-4-1','AndrewW','AndrewWallace@163.com','AndrewWallace',true),
(now() - interval'133day','1990-5-3','bbbbbjjjjj','BrandonJones@126.com','BrandonJones',true),
(now() - interval'14day','1991-7-4','mgibson,,','MollyGibson@gmail.com','MollyGibson',false),
(now() - interval'88day','1983-8-9','bernadettehud','BernadetteHudson@hotmail.com','BernadetteHudson',false),
(now() - interval'12day','2001-12-12','carolyn','CarolynArnold@hotmail.com','CarolynArnold',false),
(now() - interval'99day','1970-1-18','donnablake','DonnaBlake@gmail.com','DonnaBlake',false),
(now() - interval'134day','1991-3-23','TraceyColumbia','TraceyGraham@columbia.edu','TraceyGraham',false),
(now() - interval'124day','1995-6-29','mydavid!','DavidPiper@outlook.com','DavidPiper',true);


INSERT INTO events(time, event_type, description, uid, url, title, content) VALUES
(now() - interval'1day', 'blog', 'Its what we do with technology that judges us - John Goodenough, who helped invent the battery in our mobile phones.', 2, null, 'Phone battery inventor decries ills of mobiles','The man whose work made mobile phones possible says he does not have one himself and dislikes the way people use them.John Goodenoughs work led to the invention of the rechargeable lithium-ion battery, which is part of almost every portable electronic device.'),
(now() - interval'33day', 'blog', 'Whats your opinion?', 3, null, 'Will virtual reality ever dodge sensory reality of mankind?', 'I have a friend whose been in the room with discerning and demanding design clients like Steve Jobs. Today, coincidentally, he was gushing about Chris Jones - he called him a demigod. Here is something he built by hand. I believe this level of craftsmanship - rendered on an 8K wraparound display - would probably fake me out.'),
(now() - interval'22day', 'blog', 'Refers to the title!', 4, null, 'Who is the best selling artist of all time?','The Beatles- more number 1 hits than anyone .total of 2.3 billion total sells. 1 member is alive. 1 was killed n the 80s. They all British.'),
(now() - interval'44day', 'picture', 'Harvard', 5, 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fatlantablackstar.com%2Fwp-content%2Fuploads%2F2015%2F12%2Fa-man-was-spotted-at-harvard-soliciting-donations-for-isis.jpg&imgrefurl=http%3A%2F%2Fatlantablackstar.com%2F2015%2F12%2F21%2Fharvard-students-are-not-ready-to-deal-with-racial-justice-college-issues-apology-after-distributing-holiday-placemats-on-dealing-with-racist-relatives%2F&docid=bzEbDlBMhYCg8M&tbnid=TaW62EqWO4aHbM%3A&w=1600&h=1068&bih=739&biw=1280&ved=0ahUKEwiAufqqz97PAhUIOz4KHc3CD1YQMwhYKA0wDQ&iact=mrc&uact=8', null,null),
(now() - interval'22day', 'picture', 'this is Columbia University!', 4, 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fgsas.columbia.edu%2Fsites%2Fdefault%2Ffiles%2Fslides%2FGSAS-Slide01.jpg&imgrefurl=http%3A%2F%2Fgsas.columbia.edu%2F&docid=TZSaO6FhnkLpjM&tbnid=ZMptT09Nz1GImM%3A&w=649&h=356&bih=739&biw=1280&ved=0ahUKEwjZ6qqNz97PAhWDoD4KHWRtCi8QMwhcKAUwBQ&iact=mrc&uact=8', null,null),
(now() - interval'33day', 'picture', 'Lets swim!', 3, 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.indianworkouts.com%2Fwp-content%2Fuploads%2F2015%2F02%2FWoman-swimming-in-a-pool.jpg&imgrefurl=http%3A%2F%2Fwww.indianworkouts.com%2Fswimming-pool-exercises-to-burn-body-fat%2F&docid=F40oFAHMJg8ZWM&tbnid=8HrNsoes6otR7M%3A&w=460&h=276&bih=739&biw=1280&ved=0ahUKEwiElY39zt7PAhXFwj4KHdUPA0sQMwhfKAYwBg&iact=mrc&uact=8', null,null),
(now() - interval'22day', 'picture', 'come and play footbaoll', 1, 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F6%2F65%2FFootball_cross.jpg&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFootball&docid=oTP5Qe93NzSBMM&tbnid=H00lfN4us_dW6M%3A&w=2048&h=1536&bih=739&biw=1280&ved=0ahUKEwinhbfRzt7PAhVIeD4KHYSfBn8QMwiAASgWMBY&iact=mrc&uact=8', null,null),
(now() - interval'11day', 'picture', 'What a lovely bird!', 10, 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiVvuPuyN7PAhVIdT4KHVkBDUkQjRwIBw&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FBird&psig=AFQjCNFKW67lRgulyCO7Pfy34J-yJWHSnA&ust=1476681351772572', null,null),
(now() - interval'66day', 'picture', 'Hawaii', 9, 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.ncl.com%2Fsites%2Fdefault%2Ffiles%2FDestinationGalleries.Hawaii.SnorkelingBay900x400.jpg&imgrefurl=https%3A%2F%2Fwww.ncl.com%2Fcruise-destinations%2Fhawaii-cruises&docid=PsOt2-Q9UOAmxM&tbnid=iWsBkQ7zH_yY9M%3A&w=900&h=400&bih=739&biw=1280&ved=0ahUKEwjlrbKOyd7PAhWH4D4KHZaOA70QMwg9KAAwAA&iact=mrc&uact=8', null,null),
(now() - interval'77day', 'picture', 'This movie is really good!', 1, 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2FoRFAyhWLpeI%2Fmovieposter.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUClgRkhTL3_hImCAmdLfDE4g&docid=NEf7c_bOlQKt-M&tbnid=Tif2xX7Ub5CopM%3A&w=279&h=402&bih=739&biw=1280&ved=0ahUKEwik7rjbyd7PAhXIHh4KHUUAAvcQMwhbKCAwIA&iact=mrc&uact=8', null,null),
(now() - interval'123day', 'picture', 'See my new Google glass!', 2, 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.dispatch.com%2Fcontent%2Fgraphics%2F2014%2F01%2F03%2F1aa-abuzz03-art-g2rqdlh3-1exchange-eye-on-the-future-jpeg-05671.jpg&imgrefurl=http%3A%2F%2Fwww.dispatch.com%2Fcontent%2Fstories%2Flife_and_entertainment%2F2014%2F01%2F03%2F1aa-abuzz03-art-g2rqdlh3-1.html&docid=dkQ0-5A4oWBy5M&tbnid=xCLH4P218GsPHM%3A&w=600&h=424&bih=739&biw=1280&ved=0ahUKEwiIp6f0yd7PAhVCJR4KHcOsAHAQMwgrKAAwAA&iact=mrc&uact=8', null,null),
(now() - interval'14day', 'picture', 'Kobe, my favorite star.', 2, 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwis362Nyt7PAhUJgj4KHZVTDM4QjRwIBw&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DKFOQfmTzRVo&psig=AFQjCNG_Fg7EXsy4pT8TtlmU1TjXJAdGWQ&ust=1476681680973716', null,null);


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
(1,'https://www.google.com/imgres?imgurl=http%3A%2F%2Fstore.storeimages.cdn-apple.com%2F4973%2Fas-images.apple.com%2Fis%2Fimage%2FAppleInc%2Faos%2Fpublished%2Fimages%2FM%2FAC%2FMACBOOKPRO%2FMACBOOKPRO%3Fwid%3D1200%26hei%3D630%26fmt%3Djpeg%26qlt%3D95%26op_sharpen%3D0%26resMode%3Dbicub%26op_usm%3D0.5%2C0.5%2C0%2C0%26iccEmbed%3D0%26layer%3Dcomp%26.v%3DjBFkr3&imgrefurl=http%3A%2F%2Fwww.apple.com%2Fshop%2Fbuy-mac%2Fmacbook-pro&docid=FIH0_PTf9lvj-M&tbnid=F0PmgOK9OTIrTM%3A&w=1200&h=630&bih=739&biw=1280&ved=0ahUKEwihovGR197PAhWFPT4KHR6qAtkQMwg3KAAwAA&iact=mrc&uact=8','New Mackbook pro'),
(1,'https://www.google.com/imgres?imgurl=http%3A%2F%2Fimages.apple.com%2Fmacbook-air%2Fimages%2Foverview_wireless_hero_enhanced.png&imgrefurl=http%3A%2F%2Fwww.apple.com%2Fmacbook-air%2F&docid=GqvKBIVY7RS54M&tbnid=aqROCMosAPvveM%3A&w=1280&h=644&bih=739&biw=1280&ved=0ahUKEwjAt9L3197PAhWKZj4KHZLVBq8QMwhMKAEwAQ&iact=mrc&uact=8','New Macbook air'),
(1,'https://www.google.com/imgres?imgurl=http%3A%2F%2Fblog.syncios.com%2Fwp-content%2Fuploads%2F2015%2F12%2F517x329xiphone-5s.jpg.pagespeed.ic.V5enAu1Myz.jpg&imgrefurl=http%3A%2F%2Fblog.syncios.com%2Ftag%2Fiphone-2016%2F&docid=P2SxGOTq4Z-KCM&tbnid=sImDQlN0ShQrqM%3A&w=629&h=400&bih=739&biw=1280&ved=0ahUKEwj73Lb-197PAhUJGj4KHSgSBvcQMwg0KAEwAQ&iact=mrc&uact=8','iPhone2016'),
(1,'https://www.google.com/aclk?sa=l&ai=DChcSEwj-5NSD2N7PAhVYHYEKHd-qCdAYABAF&sig=AOD64_2BrgwpQdN05S7mH3f6Y5kxNRahEA&ctype=5&q=&ved=0ahUKEwj-vNGD2N7PAhUGeD4KHQjAAA0Qwg8IUw&adurl=','iPad'),
(1,'https://www.google.com/imgres?imgurl=http%3A%2F%2Fcdn.macrumors.com%2Farticle-new%2F2013%2F09%2F27inchimacdisplay.jpg&imgrefurl=http%3A%2F%2Fwww.macrumors.com%2Froundup%2Fimac%2F&docid=M5KyLSkUYTrIkM&tbnid=jIWjJSk2dBFzhM%3A&w=600&h=690&bih=739&biw=1280&ved=0ahUKEwj3xN-N2N7PAhVCez4KHcfVCDwQMwg6KAwwDA&iact=mrc&uact=8','iMac'),
(1,'https://www.google.com/imgres?imgurl=http%3A%2F%2Fcdn1.knowyourmobile.com%2Fsites%2Fknowyourmobilecom%2Ffiles%2F2016%2F05%2Fsiri_0.jpg&imgrefurl=http%3A%2F%2Fwww.knowyourmobile.com%2Fdevices%2Fapple-siri-speaker%2F23615%2Fapple-has-huge-plans-siri-and-new-product-her-live-inside&docid=4h1P5LMwoTK--M&tbnid=hrFrfgKxun1UAM%3A&w=1600&h=900&bih=739&biw=1280&ved=0ahUKEwj2i92W2N7PAhWEND4KHW_BBpIQMwg3KAYwBg&iact=mrc&uact=8','siri'),
(7,'https://www.google.com/imgres?imgurl=http%3A%2F%2Fguides.wiggle.co.uk%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F770x480crop%2Fpublic%2Fhero%2Fnike-free-5-0-shoes-ho14-hero.jpg%3Fitok%3DoJDui7I4&imgrefurl=http%3A%2F%2Fguides.wiggle.co.uk%2Fhow-find-your-perfect-nike-shoe&docid=0_jtTkpG7yma2M&tbnid=hGY1LJPysamSEM%3A&w=800&h=499&bih=739&biw=1280&ved=0ahUKEwjaosOc2N7PAhVIej4KHZzJDnMQMwiTASgAMAA&iact=mrc&uact=8','new shoes 2016'),
(7,'https://www.google.com/imgres?imgurl=http%3A%2F%2Fimages.sportsdirect.com%2Fimages%2Fimgzoom%2F59%2F59520401_xxl.jpg&imgrefurl=http%3A%2F%2Fwww.sportsdirect.com%2Fnike-qtt-outside-t-shirt-mens-595204&docid=PqyQv14N6JkZhM&tbnid=1CiuFjLSFd5cMM%3A&w=1425&h=1425&bih=739&biw=1280&ved=0ahUKEwiEyY6k2N7PAhWHej4KHUyUAscQMwiSASgAMAA&iact=mrc&uact=8','nice t-shirt'),
(8,'https://www.google.com/aclk?sa=l&ai=DChcSEwi9q6my2N7PAhWPPIEKHXHaDNMYABAB&sig=AOD64_2BjE5PRKlmlzYfonrNeYi-iYVY1Q&ctype=5&q=&ved=0ahUKEwjk96Wy2N7PAhXHXD4KHTMFDmsQwg8IRg&adurl=','MS Office'),
(3,'https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fb%2Fbe%2FGoogle_Glass_with_frame.jpg&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGoogle_Glass&docid=19S_WWhtqRao9M&tbnid=uYLRamNXN7E9DM%3A&w=3128&h=1704&bih=739&biw=1280&ved=0ahUKEwjklcG72N7PAhXEzz4KHVH0CTsQMwhTKAAwAA&iact=mrc&uact=8','Google Glass'),
(8,'https://www.google.com/imgres?imgurl=http%3A%2F%2Fcompass.xbox.com%2Fassets%2F4d%2Fdb%2F4ddbc203-b32f-47a7-8948-9851a6ec0599.png%3Fn%3DHomepage_cross-sell_500x281_EliteController.png&imgrefurl=http%3A%2F%2Fwww.xbox.com%2F&docid=o8hpNzNE5awdFM&tbnid=vEN9b1vX2Y9CdM%3A&w=500&h=281&bih=739&biw=1280&ved=0ahUKEwjdo-_A2N7PAhULWz4KHXAeBZgQMwhJKAEwAQ&iact=mrc&uact=8','Xbox'),
(8,'https://www.google.com/imgres?imgurl=http%3A%2F%2Fwindowsitpro.com%2Fsite-files%2Fwindowsitpro.com%2Ffiles%2Fuploads%2F2014%2F12%2Fwin10.jpg&imgrefurl=http%3A%2F%2Fwindowsitpro.com%2Fwindows-10%2Funinstall-onedrive-win10&docid=0hWR3jizyyCxWM&tbnid=lXLtoKVCOpnmCM%3A&w=595&h=335&bih=739&biw=1280&ved=0ahUKEwj-q7fL2N7PAhWBOD4KHZyPAJAQMwg8KAMwAw&iact=mrc&uact=8','Windows10')
;


INSERT INTO user_sets(filters, description, sid) VALUES
('{"age":"18-30"}', 'Young People', 1),
('{"age":"30-50"}', 'Middle Aged', 1),
('{"subscribe_topics":["technology","shopping"],"age":"0-25"}', 'Young Users who might be interested in purchase new phone', 1),
('{"post_topics":["technology"]},keywords:["iphone"]', 'Bloggers who have posted articles about iphone', 1),
('{"active_within":["30day"]},"age":"18-30","sex":"male"','Active Male Customs', 1),
('{"active_within":["30day"]},"age":"18-30","sex":"female"','Active Female Customs', 1),
('{"subscribe_topics":["sports"]},"age":"18-30","sex":"male"','Potential Male Customs', 7),
('{"subscribe_topics":["sports"]},"age":"18-30","sex":"female"','Potential Female Customs', 7),
('{"reg_time":["3year","1year"]}"','Users who have registered for a long time', 3),
('{"email":"@gmail.com$"','Users who have a gmail account', 3)
;

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

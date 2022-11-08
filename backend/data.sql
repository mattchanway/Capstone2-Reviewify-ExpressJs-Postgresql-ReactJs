DROP DATABASE IF EXISTS "reviewify";

CREATE DATABASE "reviewify";

\c "reviewify"



CREATE TABLE artists (artist_id TEXT PRIMARY KEY, 
                    name TEXT NOT NULL, 
                    image TEXT NOT NULL,
                    genre TEXT);

CREATE TABLE users (username TEXT PRIMARY KEY,
                    spotify_access_token TEXT,
                    spotify_refresh_token TEXT,
                    reviewify_session_id TEXT,
                    bio VarChar(175),
                    stars INT DEFAULT 0,
                    avatar TEXT
                    );


CREATE TABLE reviews (id SERIAL PRIMARY KEY, 
                    review_username TEXT NOT NULL REFERENCES users,
                    artist_id TEXT REFERENCES artists,
                    album_artist TEXT NOT NULL,
                    album_id TEXT NOT NULL,
                    album_name TEXT NOT NULL,
                    album_art TEXT NOT NULL,
                    title VARCHAR(100) NOT NULL, 
                    description VARCHAR(80) NOT NULL,
                    body TEXT NOT NULL,
                    review_date timestamptz DEFAULT CURRENT_TIMESTAMP, 
                    rating INT NOT NULL DEFAULT 0);

CREATE TABLE review_comments (
                    comment_id SERIAL PRIMARY KEY,
                    review_id INT NOT NULL REFERENCES reviews ON DELETE CASCADE,
                    comment_username TEXT REFERENCES users ON DELETE CASCADE,
                    comment TEXT NOT NULL);

CREATE TABLE star_votes(
            username_being_rated TEXT NOT NULL REFERENCES users,
            username_doing_rating TEXT NOT NULL REFERENCES users,
            rating INT not null,
            PRIMARY KEY(username_being_rated, username_doing_rating)
);


INSERT INTO artists(artist_id, name, image, genre)
VALUES ('03YhcM6fxypfwckPCQV8pQ', 'Wes Montgomery','https://i.scdn.co/image/556fb015a5411afb24f3d6691ac4f12847e08a14','Jazz'),
('2hGh5VOeeqimQFxqXvfCUf','John Coltrane','https://i.scdn.co/image/ab6761610000517473c7f7505c1af82929ec41df','Jazz'),
('14RXohtx6NiBGFTW8IdmAK','John Scofield','https://i.scdn.co/image/95488c0aeac21baf191764214433838c7eb0a7ca','Jazz'),
('0k17h0D3J5VfsdmQ1iZtE9','Pink Floyd','https://i.scdn.co/image/d011c95081cd9a329e506abd7ded47535d524a07','Rock');

INSERT INTO users(username, spotify_access_token, spotify_refresh_token, reviewify_session_id, bio, stars, avatar)
VALUES
('janedoe', null, null,null, 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look',
4, 'https://i.ibb.co/x7T7tJB/user1.jpg' ),
('jilldoe', null, null,null, 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look',
2, 'https://i.ibb.co/k8T731d/user2.jpg' ),
('johndoe', null, null,null, 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look',
0, 'https://i.ibb.co/2vTjZnw/user3.jpg' ),
('frankdoe', null, null,null, 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look',
0, 'https://i.ibb.co/rQhm0NS/user4.jpg' ),
('teddoe', null, null,null, 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look',
0, 'https://i.ibb.co/8m2JqJ2/user5.jpg' ),
('rickdoe', null, null,null, 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look',
0, 'https://i.ibb.co/YQ71SV8/user6.jpg' ),
('mayadoe', null, null,null, 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look',
0, 'https://i.ibb.co/t4D2Djb/user7.jpg' ),
('alexdoe', null, null,null, 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look',
0, 'https://i.ibb.co/6sqrtmZ/user8.jpg' );

INSERT INTO reviews(review_username, artist_id, album_artist, album_id, album_name, album_art, title, description, body, rating)
VALUES('janedoe','03YhcM6fxypfwckPCQV8pQ', 'Wes Montgomery','1junpO1JYOvWEcWOIt5PpP','The Incredible Jazz Guitar of West Montgomery'
,'https://i.scdn.co/image/ab67616d00001e02918d446596ec426300710baa','A wonderful listen for a pensive evening!', 'The point of using Lore Ipsum is that it has a more-or-less normal distribution',
'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
5),
('janedoe','2hGh5VOeeqimQFxqXvfCUf', 'John Coltrane','7MBQWjukLxXZYvQ8vzEH7t','Giant Steps',
'https://i.scdn.co/image/ab67616d00001e02073aecd10185e5a5fd88eb90','A timeless classic is born!', 'The point of using Lore Ipsum is that it has a more-or-less normal distribution',
'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
5),
('janedoe','14RXohtx6NiBGFTW8IdmAK', 'John Scofield','08JMKtDS0StcwDUgdxKIw3','A Go Go',
'https://i.scdn.co/image/ab67616d00001e02b65072bd44ff8f6a9b9e5eaa','Scofield never fails to disappoint', 'The point of using Lore Ipsum is that it has a more-or-less normal distribution',
'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
4),
('janedoe','03YhcM6fxypfwckPCQV8pQ', 'Wes Montgomery','0rhsS0MBfCmMcyHIj2J0n7','Full House'
,'https://i.scdn.co/image/ab67616d00001e02cb313d27bbc7642dba1399a7','A great capture of Wes Montgomery doing what he did best', 'The point of using Lore Ipsum is that it has a more-or-less normal distribution',
'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
5),
('janedoe','2hGh5VOeeqimQFxqXvfCUf', 'John Coltrane','7Eoz7hJvaX1eFkbpQxC5PA','A Love Supreme',
'https://i.scdn.co/image/ab67616d00001e02ea42191f549dce4d9c8ecd1a','One of my favorite albums ever!', 'The point of using Lore Ipsum is that it has a more-or-less normal distribution',
'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
5),
('johndoe','14RXohtx6NiBGFTW8IdmAK', 'John Scofield','0FJnmv6GrQQa1eo5ITR7kf','Blue Matter',
'https://i.scdn.co/image/ab67616d00001e02a7d264e438991c2998a07140','Too complex for my taste, but worth a listen if you are into this style', 'The point of using Lore Ipsum is that it has a more-or-less normal distribution',
'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
3),
('johndoe','14RXohtx6NiBGFTW8IdmAK', 'John Scofield','6B6Legr1T9aMiMxL55SZnK','Thats What I Say',
'https://i.scdn.co/image/ab67616d00001e029be46b56f229ff17323cd146','Was expecting rock and roll, was I ever disappointed!', 'The point of using Lore Ipsum is that it has a more-or-less normal distribution',
'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
1),
('johndoe','03YhcM6fxypfwckPCQV8pQ', 'Wes Montgomery','5Z6DQMOjrC5DK1pQ3RBdZ5','A Day In The Life'
,'https://i.scdn.co/image/ab67616d00001e026c690daf9854f3b9267c9aeb','Love Wes!', 'The point of using Lore Ipsum is that it has a more-or-less normal distribution',
'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
5),
('johndoe','2hGh5VOeeqimQFxqXvfCUf', 'John Coltrane','2Z11cXWEa2qqYQBGkJrCga','Blue Train',
'https://i.scdn.co/image/ab67616d00001e02611ea3fb281f7956ffd33b77','An underrated gem', 'The point of using Lore Ipsum is that it has a more-or-less normal distribution',
'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
5),
('johndoe','0k17h0D3J5VfsdmQ1iZtE9', 'Pink Floyd','0bCAjiUamIFqKJsekOYuRw','Wish You Were Here',
'https://i.scdn.co/image/ab67616d00001e021a84d71391df7469c5ab8539','I do not like Pink Floyd', 'The point of using Lore Ipsum is that it has a more-or-less normal distribution',
'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
2);
INSERT INTO review_comments(review_id, comment_username, comment)
VALUES(1, 'jilldoe','Could not agree more!!'),
(1, 'frankdoe','Thank you for sharing!'),
(1, 'mayadoe','Great read!'),
(10, 'frankdoe', 'I agree, Pink Floyd is overrated'),
(10, 'teddoe','What a terrible review, I cannot believe anyone would agree with you'),
(10, 'janedoe', 'It is sad, isnt it Ted.');
INSERT INTO star_votes(username_being_rated, username_doing_rating, rating)
VALUES('janedoe','jilldoe',1),
('janedoe','johndoe',1),
('janedoe','frankdoe',1),
('janedoe', 'teddoe',1),
('jilldoe', 'janedoe',1),
('jilldoe','teddoe',1);












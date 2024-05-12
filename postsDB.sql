
/* Create the database */
CREATE DATABASE  IF NOT EXISTS postsDB;

use postsDB;

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS passwords;

/* Create the tables */

CREATE TABLE passwords (
  passwordID int AUTO_INCREMENT,
  password varchar(1000) NOT NULL,
  PRIMARY KEY (passwordID)
);

CREATE TABLE addresses (
  addressID int AUTO_INCREMENT,
  street varchar(50) NOT NULL,
  city varchar(50) NOT NULL,
  zipcode varchar(10) NOT NULL,
  PRIMARY KEY (addressID)
);

CREATE TABLE users (
  userID int(9) AUTO_INCREMENT,
  userName varchar(50) NOT NULL,
  name varchar(50) ,
  email varchar(30) ,
  phone varchar(100),
  addressID int ,
  passwordID int NOT NULL,
  company varchar(50) ,
  PRIMARY KEY (userID),
  FOREIGN KEY (addressID) REFERENCES addresses (addressID),
  FOREIGN KEY (passwordID) REFERENCES passwords (passwordID)
);

CREATE TABLE todos (
  todoID int AUTO_INCREMENT,
  completed boolean NOT NULL,
  title varchar(50) NOT NULL,
  userID int NOT NULL,
  PRIMARY KEY (todoID),
  FOREIGN KEY (userID) REFERENCES users (userID)
);

CREATE TABLE posts (
  postID int AUTO_INCREMENT,
  title varchar(50) NOT NULL,
  body varchar(500) NOT NULL,
  userID int NOT NULL,
  PRIMARY KEY (postID),
  FOREIGN KEY (userID) REFERENCES users (userID)
);

CREATE TABLE comments (
  commentID int AUTO_INCREMENT,
  postID int NOT NULL,
  body varchar(500) NOT NULL,
  email varchar(30) NOT NULL,
  commentName varchar(500) NOT NULL,
  PRIMARY KEY (commentID),
  FOREIGN KEY (postID) REFERENCES posts (postID)
);

INSERT INTO passwords (password) VALUES
('freedom12'),
('liberty4'),
('liberate'),
('equality'),
('democracy'),
('justice9'),
('independ'),
('rights4'),
('peaceful'),
('revolute');

INSERT INTO addresses (street, city, zipcode) VALUES
('123 Freedom Ave', 'Liberty City', 'FRE123'),
('456 Liberty St', 'Independence Town', 'IND456'),
('789 Liberty Blvd', 'Equalityville', 'EQL789'),
('321 Justice Rd', 'Democracy Springs', 'DEM321'),
('654 Revolution Lane', 'Peaceful Meadows', 'PEA654'),
('987 Rights Blvd', 'Freeville', 'FRE987'),
('123 Liberty Ln', 'Liberation City', 'LIB123'),
('456 Equality Ave', 'Justiceburg', 'JUS456'),
('789 Democracy St', 'Revolution City', 'REV789'),
('321 Peaceful Blvd', 'Rightsville', 'RIG321');

INSERT INTO users (userName, name, email, phone, addressID, passwordID, company) VALUES
('freedomlover', 'John Doe', 'john.doe@example.com', '123-456-7890', 1, 1, 'Freedom Inc.'),
('libertyseeker', 'Jane Smith', 'jane.smith@example.com', '456-789-0123', 2, 2, 'Liberty Co.'),
('liberator1', 'Michael Johnson', 'michael.johnson@example.com', '789-012-3456', 3, 3, 'Liberation Enterprises'),
('equalityforall', 'Emily Brown', 'emily.brown@example.com', '012-345-6789', 4, 4, 'Equality Foundation'),
('democracylover', 'David Wilson', 'david.wilson@example.com', '345-678-9012', 5, 5, 'Democracy Corp.'),
('justicefighter', 'Sarah Lee', 'sarah.lee@example.com', '678-901-2345', 6, 6, 'Justice Advocates'),
('independencer', 'Christopher Clark', 'christopher.clark@example.com', '901-234-5678', 7, 7, 'Independence LLC'),
('rightsactivist', 'Rachel Martinez', 'rachel.martinez@example.com', '234-567-8901', 8, 8, 'Rights Group'),
('peacemaker', 'Daniel White', 'daniel.white@example.com', '567-890-1234', 9, 9, 'Peaceful Solutions'),
('revolutionary', 'Amanda Taylor', 'amanda.taylor@example.com', '890-123-4567', 10, 10, 'Revolutionary Movement');

INSERT INTO todos (completed, title, userID) VALUES
(true, 'Spread the message of freedom', 1),
(true, 'Advocate for liberty', 2),
(true, 'Fight for liberation', 3),
(false, 'Strive for equality', 4),
(false, 'Defend democracy', 5),
(true, 'Seek justice', 6),
(false, 'Promote independence', 7),
(true, 'Protect rights', 8),
(false, 'Work for peace', 9),
(true, 'Inspire revolution', 10);

INSERT INTO posts (title, body, userID) VALUES
('The Essence of Freedom', 'Freedom is the oxygen of the soul.', 1),
('In Pursuit of Liberty', 'Liberty is the cornerstone of a thriving society.', 2),
('Liberation Now!', 'It is time to break the chains of oppression.', 3),
('Equality Matters', 'Every individual deserves equal opportunities and rights.', 4),
('Democracy Call', 'Let the voice of the people be heard.', 5),
('Quest for Justice', 'Justice is the bedrock of a fair society.', 6),
('Embracing Independence', 'Independence paves the way for self-determination.', 7),
('Championing Rights', 'Stand up for what is right and just.', 8),
('The Path to Peace', 'Peace is not merely the absence of conflict but the presence of justice.', 9),
('Rallying for Revolution', 'The time for change is now.', 10);

INSERT INTO comments (postID, body, email, commentName) VALUES
(1, 'Well said! Freedom indeed fuels our spirits.', 'freedomlover@example.com', 'FreedomFan123'),
(2, 'Absolutely! Liberty is our birthright.', 'libertyseeker@example.com', 'LibertyLover456'),
(3, 'Liberation is long overdue. Let''s make it happen!', 'liberator1@example.com', 'LiberationWarrior789'),
(4, 'Equality is essential for a just society.', 'equalityforall@example.com', 'EqualityAdvocate321'),
(5, 'Democracy empowers the people to shape their destiny.', 'democracylover@example.com', 'DemocracyDefender654'),
(6, 'Justice must prevail for all.', 'justicefighter@example.com', 'JusticeSeeker987'),
(7, 'Independence allows us to chart our own course.', 'independencer@example.com', 'IndependenceAdvocate123'),
(8, 'Rights are not negotiable. Stand firm.', 'rightsactivist@example.com', 'RightsChampion456'),
(9, 'Peace is the cornerstone of progress.', 'peacemaker@example.com', 'PeaceBuilder789'),
(10, 'Revolution begins with the courage to challenge the status quo.', 'revolutionary@example.com', 'RevolutionarySpirit321'),
(10, 'Comment 1 for post 10.', 'commenter10@example.com', 'Commenter 10')

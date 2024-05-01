
/* Create the database */
CREATE DATABASE  IF NOT EXISTS postsDB;

use postDB;
--
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS addresses;

/* Create the tables */


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
  personName varchar(50) NOT NULL,
  email varchar(10) NOT NULL,
  phone varchar(100) NOT NULL,
  addressID int NOT NULL,
  company varchar(50) NOT NULL,
  PRIMARY KEY (userID),
  FOREIGN KEY (addressID) REFERENCES addresses (addressID)
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

INSERT INTO addresses (street, city, zipcode) VALUES
('123 Main St', 'New York', '10001'),
('456 Elm St', 'Los Angeles', '90001'),
('789 Oak St', 'Chicago', '60601'),
('101 Pine St', 'San Francisco', '94101'),
('202 Maple St', 'Seattle', '98101'),
('303 Cedar St', 'Miami', '33101'),
('404 Birch St', 'Dallas', '75201'),
('505 Walnut St', 'Boston', '02101'),
('606 Ash St', 'Houston', '77001'),
('707 Spruce St', 'Atlanta', '30301');

INSERT INTO users (userName, personName, email, phone, addressID, company) VALUES
('user1', 'John Doe', 'john@example.com', '123-456-7890', 1, 'ABC Inc.'),
('user2', 'Jane Smith', 'jane@example.com', '987-654-3210', 2, 'XYZ Corp.'),
('user3', 'David Brown', 'david@example.com', '111-222-3333', 3, '123 Industries'),
('user4', 'Emily Johnson', 'emily@example.com', '444-555-6666', 4, '456 Corp.'),
('user5', 'Michael Davis', 'michael@example.com', '777-888-9999', 5, '789 Co.'),
('user6', 'Sarah Wilson', 'sarah@example.com', '000-111-2222', 6, 'ABC Corp.'),
('user7', 'Daniel Martinez', 'daniel@example.com', '333-444-5555', 7, 'XYZ Ltd.'),
('user8', 'Olivia Anderson', 'olivia@example.com', '666-777-8888', 8, '1234 Enterprises'),
('user9', 'William Taylor', 'william@example.com', '999-000-1111', 9, '4567 Company'),
('user10', 'Sophia Garcia', 'sophia@example.com', '222-333-4444', 10, '7899 LLC');

INSERT INTO todos (completed, title, userID) VALUES
(true, 'Task 1', 1),
(false, 'Task 2', 2),
(true, 'Task 3', 3),
(false, 'Task 4', 4),
(true, 'Task 5', 5),
(false, 'Task 6', 6),
(true, 'Task 7', 7),
(false, 'Task 8', 8),
(true, 'Task 9', 9),
(false, 'Task 10', 10);

INSERT INTO posts (title, body, userID) VALUES
('Post 1', 'This is the body of post 1.', 1),
('Post 2', 'This is the body of post 2.', 2),
('Post 3', 'This is the body of post 3.', 3),
('Post 4', 'This is the body of post 4.', 4),
('Post 5', 'This is the body of post 5.', 5),
('Post 6', 'This is the body of post 6.', 6),
('Post 7', 'This is the body of post 7.', 7),
('Post 8', 'This is the body of post 8.', 8),
('Post 9', 'This is the body of post 9.', 9),
('Post 10', 'This is the body of post 10.', 10);

INSERT INTO comments (postID, body, email, commentName) VALUES
(1, 'Comment 1 for post 1.', 'commenter1@example.com', 'Commenter 1'),
(2, 'Comment 1 for post 2.', 'commenter2@example.com', 'Commenter 2'),
(3, 'Comment 1 for post 3.', 'commenter3@example.com', 'Commenter 3'),
(4, 'Comment 1 for post 4.', 'commenter4@example.com', 'Commenter 4'),
(5, 'Comment 1 for post 5.', 'commenter5@example.com', 'Commenter 5'),
(6, 'Comment 1 for post 6.', 'commenter6@example.com', 'Commenter 6'),
(7, 'Comment 1 for post 7.', 'commenter7@example.com', 'Commenter 7'),
(8, 'Comment 1 for post 8.', 'commenter8@example.com', 'Commenter 8'),
(9, 'Comment 1 for post 9.', 'commenter9@example.com', 'Commenter 9'),
(10, 'Comment 1 for post 10.', 'commenter10@example.com', 'Commenter 10');

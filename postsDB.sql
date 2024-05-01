
/* Create the database */
CREATE DATABASE  IF NOT EXISTS postsDB;

use postDB;
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
  userID int NOT NULL,
  PRIMARY KEY (commentID),
  FOREIGN KEY (postID) REFERENCES posts (postID)
);

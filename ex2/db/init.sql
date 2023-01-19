CREATE DATABASE auth;
GRANT ALL PRIVILEGES ON DATABASE auth TO user;

CREATE TABLE User (
    id int serial PRIMARY KEY,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
);

INSERT INTO User (email, password) VALUES ('user1@saritasa.com', 'sar1tasa');
INSERT INTO User (email, password) VALUES ('user2@saritasa.com', 'sar1tasa');
INSERT INTO User (email, password) VALUES ('user3@saritasa.com', 'sar1tasa');
INSERT INTO User (email, password) VALUES ('user4@saritasa.com', 'sar1tasa');
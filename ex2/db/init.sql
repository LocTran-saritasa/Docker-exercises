CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO Users (email, password) VALUES ('user1@saritasa.com', 'sar1tasa');
INSERT INTO Users (email, password) VALUES ('user2@saritasa.com', 'sar1tasa');
INSERT INTO Users (email, password) VALUES ('user3@saritasa.com', 'sar1tasa');
INSERT INTO Users (email, password) VALUES ('user4@saritasa.com', 'sar1tasa');

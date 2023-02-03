CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Users_Groups (
    memberId INT,
    groupId INT,
    isAdmin BOOLEAN,
    PRIMARY KEY(memberId, groupId)
);

CREATE TABLE Tasks(
    id SERIAL PRIMARY KEY,
    userId INT,
    name VARCHAR(255)
);

CREATE TABLE Tasks_Groups(
    taskId INT,
    groupId INT,
    sentAt TIMESTAMP,
    PRIMARY KEY (taskId, groupId)
);

CREATE TABLE Words(
    id SERIAL PRIMARY KEY,
    taskId INT,
    text VARCHAR(255) NOT NULL
);

CREATE TABLE Translations(
    id SERIAL PRIMARY KEY,
    wordId INT,
    language VARCHAR(255) NOT NULL,
    text VARCHAR(255) NOT NULL
);

ALTER TABLE Users_Groups
    ADD CONSTRAINT fk_member_user FOREIGN KEY (memberId) REFERENCES Users(id),
    ADD CONSTRAINT fk_member_group FOREIGN KEY (groupId) REFERENCES Groups(id);
ALTER TABLE Tasks
    ADD CONSTRAINT fk_task_user FOREIGN KEY (userId) REFERENCES Users(id);
ALTER TABLE Tasks_Groups
    ADD CONSTRAINT fk_send_task FOREIGN KEY (taskId) REFERENCES Tasks(id),
    ADD CONSTRAINT fk_send_group FOREIGN KEY (groupId) REFERENCES Groups(id);
ALTER TABLE Words
    ADD CONSTRAINT fk_word_task FOREIGN KEY (taskId) REFERENCES Tasks(id);
ALTER TABLE Translations
    ADD CONSTRAINT fk_translation_word FOREIGN KEY (wordId) REFERENCES Words(id);


INSERT INTO Users (email, name, password) VALUES ('teacher1@saritasa.com', 'teacher1', '12345');
INSERT INTO Users (email, name, password) VALUES ('student1@saritasa.com', 'student1', '12345');
INSERT INTO Users (email, name, password) VALUES ('student2@saritasa.com', 'student2', '12345');
INSERT INTO Users (email, name, password) VALUES ('student3@saritasa.com', 'student3', '12345');
INSERT INTO Users (email, name, password) VALUES ('student4@saritasa.com', 'student4', '12345');
INSERT INTO Users (email, name, password) VALUES ('student5@saritasa.com', 'student5', '12345');

INSERT INTO Groups(name) VALUES ('English and life');
INSERT INTO Groups(name) VALUES ('One day one vocabulary');

INSERT INTO Users_Groups (memberId, groupId, isAdmin) VALUES (1, 1, true);
INSERT INTO Users_Groups (memberId, groupId, isAdmin) VALUES (1, 2, true);
INSERT INTO Users_Groups (memberId, groupId, isAdmin) VALUES (2, 1, false);
INSERT INTO Users_Groups (memberId, groupId, isAdmin) VALUES (3, 1, false);
INSERT INTO Users_Groups (memberId, groupId, isAdmin) VALUES (4, 1, false);
INSERT INTO Users_Groups (memberId, groupId, isAdmin) VALUES (5, 2, false);

INSERT INTO Tasks (userId, name) VALUES (1, 'Animal');
INSERT INTO Tasks (userId, name) VALUES (1, 'Color');
INSERT INTO Tasks (userId, name) VALUES (1, 'School');
INSERT INTO Tasks (userId, name) VALUES (1, 'Number');

INSERT INTO Tasks_Groups (taskId, groupId, sentAt) VALUES(1, 1, '2022-12-31 23:12:59');
INSERT INTO Tasks_Groups (taskId, groupId, sentAt) VALUES(3, 2, '2023-01-30 14:10:22');
INSERT INTO Tasks_Groups (taskId, groupId, sentAt) VALUES(3, 1, '2022-07-22 21:21:44');

INSERT INTO Words (taskId, text) VALUES(1, 'Cat');
INSERT INTO Words (taskId, text) VALUES(1, 'Dog');
INSERT INTO Words (taskId, text) VALUES(1, 'Elephant');
INSERT INTO Words (taskId, text) VALUES(1, 'Hippo');
INSERT INTO Words (taskId, text) VALUES(2, 'Red');
INSERT INTO Words (taskId, text) VALUES(2, 'Green');
INSERT INTO Words (taskId, text) VALUES(2, 'Blue');
INSERT INTO Words (taskId, text) VALUES(3, 'Eraser');
INSERT INTO Words (taskId, text) VALUES(3, 'Pen');
INSERT INTO Words (taskId, text) VALUES(3, 'Book');
INSERT INTO Words (taskId, text) VALUES(4, 'One');
INSERT INTO Words (taskId, text) VALUES(4, 'Four');
INSERT INTO Words (taskId, text) VALUES(4, 'Seven');

INSERT INTO Translations (wordId, language, text) VALUES (1, 'Vietnamese', 'Con mèo');
INSERT INTO Translations (wordId, language, text) VALUES (2, 'Vietnamese', 'Con chó');
INSERT INTO Translations (wordId, language, text) VALUES (3, 'Vietnamese', 'Con voi');
INSERT INTO Translations (wordId, language, text) VALUES (4, 'Vietnamese', 'Con hà mã');
INSERT INTO Translations (wordId, language, text) VALUES (1, 'Russian', 'Кот');
INSERT INTO Translations (wordId, language, text) VALUES (2, 'Russian', 'Собака');
INSERT INTO Translations (wordId, language, text) VALUES (3, 'Russian', 'Слон');
INSERT INTO Translations (wordId, language, text) VALUES (4, 'Russian', 'Бегемот');
INSERT INTO Translations (wordId, language, text) VALUES (1, 'French', 'Chat');
INSERT INTO Translations (wordId, language, text) VALUES (3, 'French', 'Éléphant');
INSERT INTO Translations (wordId, language, text) VALUES (5, 'Vietnamese', 'Màu đỏ');
INSERT INTO Translations (wordId, language, text) VALUES (6, 'Vietnamese', 'Màu xanh lá');
INSERT INTO Translations (wordId, language, text) VALUES (7, 'Vietnamese', 'Màu xanh dương');
INSERT INTO Translations (wordId, language, text) VALUES (5, 'Vietnamese', 'Красный');
INSERT INTO Translations (wordId, language, text) VALUES (6, 'Vietnamese', 'Зеленый');
INSERT INTO Translations (wordId, language, text) VALUES (7, 'Vietnamese', 'Синий');
INSERT INTO Translations (wordId, language, text) VALUES (8, 'Vietnamese', 'Cục tẩy');
INSERT INTO Translations (wordId, language, text) VALUES (9, 'Vietnamese', 'Cây viết');
INSERT INTO Translations (wordId, language, text) VALUES (10, 'Vietnamese', 'Cuốn sách');
INSERT INTO Translations (wordId, language, text) VALUES (8, 'Russian', 'Ластик');
INSERT INTO Translations (wordId, language, text) VALUES (9, 'Russian', 'Ручка');
INSERT INTO Translations (wordId, language, text) VALUES (10, 'Russian', 'Книга');
INSERT INTO Translations (wordId, language, text) VALUES (11, 'Vietnamese', 'một');
INSERT INTO Translations (wordId, language, text) VALUES (12, 'Vietnamese', 'bốn');
INSERT INTO Translations (wordId, language, text) VALUES (13, 'Vietnamese', 'bảy');
INSERT INTO Translations (wordId, language, text) VALUES (11, 'Russian', 'один');
INSERT INTO Translations (wordId, language, text) VALUES (12, 'Russian', 'четыре');
INSERT INTO Translations (wordId, language, text) VALUES (13, 'Russian', 'Семь');

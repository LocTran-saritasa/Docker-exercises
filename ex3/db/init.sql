CREATE TABLE public."Users" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE public."Groups" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE public."Users_Groups" (
    memberId INT,
    groupId INT,
    isAdmin BOOLEAN,
    PRIMARY KEY(memberId, groupId)
);

CREATE TABLE public."Tasks"(
    id SERIAL PRIMARY KEY,
    userId INT,
    name VARCHAR(255)
);

CREATE TABLE public."Tasks_Groups"(
    taskId INT,
    groupId INT,
    sentAt TIMESTAMP,
    PRIMARY KEY (taskId, groupId)
);

CREATE TABLE public."Words"(
    id SERIAL PRIMARY KEY,
    taskId INT,
    text VARCHAR(255) NOT NULL
);

CREATE TABLE public."Translations"(
    id SERIAL PRIMARY KEY,
    wordId INT,
    language VARCHAR(255) NOT NULL,
    text VARCHAR(255) NOT NULL
);

ALTER TABLE public."Users_Groups"
    ADD CONSTRAINT fk_member_user FOREIGN KEY (memberId) REFERENCES public."Users"(id),
    ADD CONSTRAINT fk_member_group FOREIGN KEY (groupId) REFERENCES public."Groups"(id);
ALTER TABLE public."Tasks"
    ADD CONSTRAINT fk_task_user FOREIGN KEY (userId) REFERENCES public."Users"(id);
ALTER TABLE public."Tasks_Groups"
    ADD CONSTRAINT fk_send_task FOREIGN KEY (taskId) REFERENCES public."Tasks"(id),
    ADD CONSTRAINT fk_send_group FOREIGN KEY (groupId) REFERENCES public."Groups"(id);
ALTER TABLE public."Words"
    ADD CONSTRAINT fk_word_task FOREIGN KEY (taskId) REFERENCES public."Tasks"(id);
ALTER TABLE public."Translations"
    ADD CONSTRAINT fk_translation_word FOREIGN KEY (wordId) REFERENCES public."Words"(id);


INSERT INTO public."Users" (email, name, password) VALUES ('teacher1@saritasa.com', 'teacher1', '12345');
INSERT INTO public."Users" (email, name, password) VALUES ('student1@saritasa.com', 'student1', '12345');
INSERT INTO public."Users" (email, name, password) VALUES ('student2@saritasa.com', 'student2', '12345');
INSERT INTO public."Users" (email, name, password) VALUES ('student3@saritasa.com', 'student3', '12345');
INSERT INTO public."Users" (email, name, password) VALUES ('student4@saritasa.com', 'student4', '12345');
INSERT INTO public."Users" (email, name, password) VALUES ('student5@saritasa.com', 'student5', '12345');

INSERT INTO public."Groups"(name) VALUES ('English and life');
INSERT INTO public."Groups"(name) VALUES ('One day one vocabulary');

INSERT INTO public."Users_Groups" (memberId, groupId, isAdmin) VALUES (1, 1, true);
INSERT INTO public."Users_Groups" (memberId, groupId, isAdmin) VALUES (1, 2, true);
INSERT INTO public."Users_Groups" (memberId, groupId, isAdmin) VALUES (2, 1, false);
INSERT INTO public."Users_Groups" (memberId, groupId, isAdmin) VALUES (3, 1, false);
INSERT INTO public."Users_Groups" (memberId, groupId, isAdmin) VALUES (4, 1, false);
INSERT INTO public."Users_Groups" (memberId, groupId, isAdmin) VALUES (5, 2, false);

INSERT INTO public."Tasks" (userId, name) VALUES (1, 'Animal');
INSERT INTO public."Tasks" (userId, name) VALUES (1, 'Color');
INSERT INTO public."Tasks" (userId, name) VALUES (1, 'School');
INSERT INTO public."Tasks" (userId, name) VALUES (1, 'Number');

INSERT INTO public."Tasks_Groups" (taskId, groupId, sentAt) VALUES(1, 1, '2022-12-31 23:12:59');
INSERT INTO public."Tasks_Groups" (taskId, groupId, sentAt) VALUES(3, 2, '2023-01-30 14:10:22');
INSERT INTO public."Tasks_Groups" (taskId, groupId, sentAt) VALUES(3, 1, '2022-07-22 21:21:44');

INSERT INTO public."Words" (taskId, text) VALUES(1, 'Cat');
INSERT INTO public."Words" (taskId, text) VALUES(1, 'Dog');
INSERT INTO public."Words" (taskId, text) VALUES(1, 'Elephant');
INSERT INTO public."Words" (taskId, text) VALUES(1, 'Hippo');
INSERT INTO public."Words" (taskId, text) VALUES(2, 'Red');
INSERT INTO public."Words" (taskId, text) VALUES(2, 'Green');
INSERT INTO public."Words" (taskId, text) VALUES(2, 'Blue');
INSERT INTO public."Words" (taskId, text) VALUES(3, 'Eraser');
INSERT INTO public."Words" (taskId, text) VALUES(3, 'Pen');
INSERT INTO public."Words" (taskId, text) VALUES(3, 'Book');
INSERT INTO public."Words" (taskId, text) VALUES(4, 'One');
INSERT INTO public."Words" (taskId, text) VALUES(4, 'Four');
INSERT INTO public."Words" (taskId, text) VALUES(4, 'Seven');

INSERT INTO public."Translations" (wordId, language, text) VALUES (1, 'Vietnamese', 'Con mèo');
INSERT INTO public."Translations" (wordId, language, text) VALUES (2, 'Vietnamese', 'Con chó');
INSERT INTO public."Translations" (wordId, language, text) VALUES (3, 'Vietnamese', 'Con voi');
INSERT INTO public."Translations" (wordId, language, text) VALUES (4, 'Vietnamese', 'Con hà mã');
INSERT INTO public."Translations" (wordId, language, text) VALUES (1, 'Russian', 'Кот');
INSERT INTO public."Translations" (wordId, language, text) VALUES (2, 'Russian', 'Собака');
INSERT INTO public."Translations" (wordId, language, text) VALUES (3, 'Russian', 'Слон');
INSERT INTO public."Translations" (wordId, language, text) VALUES (4, 'Russian', 'Бегемот');
INSERT INTO public."Translations" (wordId, language, text) VALUES (1, 'French', 'Chat');
INSERT INTO public."Translations" (wordId, language, text) VALUES (3, 'French', 'Éléphant');
INSERT INTO public."Translations" (wordId, language, text) VALUES (5, 'Vietnamese', 'Màu đỏ');
INSERT INTO public."Translations" (wordId, language, text) VALUES (6, 'Vietnamese', 'Màu xanh lá');
INSERT INTO public."Translations" (wordId, language, text) VALUES (7, 'Vietnamese', 'Màu xanh dương');
INSERT INTO public."Translations" (wordId, language, text) VALUES (5, 'Vietnamese', 'Красный');
INSERT INTO public."Translations" (wordId, language, text) VALUES (6, 'Vietnamese', 'Зеленый');
INSERT INTO public."Translations" (wordId, language, text) VALUES (7, 'Vietnamese', 'Синий');
INSERT INTO public."Translations" (wordId, language, text) VALUES (8, 'Vietnamese', 'Cục tẩy');
INSERT INTO public."Translations" (wordId, language, text) VALUES (9, 'Vietnamese', 'Cây viết');
INSERT INTO public."Translations" (wordId, language, text) VALUES (10, 'Vietnamese', 'Cuốn sách');
INSERT INTO public."Translations" (wordId, language, text) VALUES (8, 'Russian', 'Ластик');
INSERT INTO public."Translations" (wordId, language, text) VALUES (9, 'Russian', 'Ручка');
INSERT INTO public."Translations" (wordId, language, text) VALUES (10, 'Russian', 'Книга');
INSERT INTO public."Translations" (wordId, language, text) VALUES (11, 'Vietnamese', 'một');
INSERT INTO public."Translations" (wordId, language, text) VALUES (12, 'Vietnamese', 'bốn');
INSERT INTO public."Translations" (wordId, language, text) VALUES (13, 'Vietnamese', 'bảy');
INSERT INTO public."Translations" (wordId, language, text) VALUES (11, 'Russian', 'один');
INSERT INTO public."Translations" (wordId, language, text) VALUES (12, 'Russian', 'четыре');
INSERT INTO public."Translations" (wordId, language, text) VALUES (13, 'Russian', 'Семь');

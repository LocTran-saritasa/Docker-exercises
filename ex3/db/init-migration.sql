CREATE EXTENSION pgcrypto;

CREATE TABLE public."user" (
  id serial4 NOT NULL,
  email varchar(30) NOT NULL,
  password_hash varchar(255) NOT NULL,
  firstname varchar(255) NULL,
  lastname varchar(255) NULL,
  created_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  is_admin bool NOT NULL DEFAULT false,
  CONSTRAINT user_pkey PRIMARY KEY (id)
);

CREATE role vocabulary_admin;

GRANT pg_read_all_data TO vocabulary_admin;

GRANT ALL ON ALL TABLES IN SCHEMA public TO vocabulary_admin;

INSERT INTO
  public."user" (id, email, password_hash, firstname, lastname, created_date, is_admin)
VALUES
(
    111,
    'admin@saritasa.com',
    crypt('123', gen_salt('md5')),
    'Stephan',
    'Larok',
    '2022-12-22 09:01:01.720',    
    TRUE
  );

CREATE TYPE public.jwt_token AS (
  role text,
  exp integer,
  user_id integer,
  is_admin boolean,
  email varchar
);

CREATE FUNCTION public.authenticate(
  email text, 
  password text
) RETURNS public.jwt_token AS $$ 
DECLARE
  account public.user;
BEGIN
  SELECT
    u.* INTO account
  FROM
    public.user AS u
  WHERE
    u.email = authenticate.email;

  IF account.password_hash = crypt(password, account.password_hash) THEN 
    RETURN (
      'vocabulary_admin',
      extract(
        epoch
        FROM NOW() + interval '30 days'
      ),
      account.id,
      account.is_admin,
      account.email
    )::public.jwt_token;
  ELSE
    RETURN NULL;
  END IF;
END;

$$ language plpgsql strict SECURITY DEFINER;

CREATE FUNCTION current_user_id() RETURNS integer AS $$
SELECT
  nullif(current_setting('jwt.claims.user_id', TRUE), '')::integer;

$$ language SQL stable;

CREATE FUNCTION public.user_profile() RETURNS "user" AS $$
SELECT
  *
FROM
  public.user
WHERE
  id = current_user_id();

$$ language SQL stable;

CREATE TABLE public."group" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE public."user_group" (
    memberId INT,
    groupId INT,
    isAdmin BOOLEAN,
    PRIMARY KEY(memberId, groupId)
);

CREATE TABLE public."task"(
    id SERIAL PRIMARY KEY,
    userId INT,
    name VARCHAR(255)
);

CREATE TABLE public."task_group"(
    taskId INT,
    groupId INT,
    sentAt TIMESTAMP,
    PRIMARY KEY (taskId, groupId)
);

CREATE TABLE public."word"(
    id SERIAL PRIMARY KEY,
    taskId INT,
    text VARCHAR(255) NOT NULL
);

CREATE TABLE public."translation"(
    id SERIAL PRIMARY KEY,
    wordId INT,
    language VARCHAR(255) NOT NULL,
    text VARCHAR(255) NOT NULL
);

ALTER TABLE public."user_group"
    ADD CONSTRAINT fk_member_user FOREIGN KEY (memberId) REFERENCES public."user"(id),
    ADD CONSTRAINT fk_member_group FOREIGN KEY (groupId) REFERENCES public."group"(id);
ALTER TABLE public."task"
    ADD CONSTRAINT fk_task_user FOREIGN KEY (userId) REFERENCES public."user"(id);
ALTER TABLE public."task_group"
    ADD CONSTRAINT fk_send_task FOREIGN KEY (taskId) REFERENCES public."task"(id),
    ADD CONSTRAINT fk_send_group FOREIGN KEY (groupId) REFERENCES public."group"(id);
ALTER TABLE public."word"
    ADD CONSTRAINT fk_word_task FOREIGN KEY (taskId) REFERENCES public."task"(id);
ALTER TABLE public."translation"
    ADD CONSTRAINT fk_translation_word FOREIGN KEY (wordId) REFERENCES public."word"(id);

INSERT INTO public."user" (id, email, password_hash, firstname, lastname) VALUES
(
    1,
    'teacher1@saritasa.com',
    crypt('123', gen_salt('md5')),
    'Stephan',
    'John'
  );
INSERT INTO public."user" (id, email, password_hash, firstname, lastname) VALUES
(
    2,
    'student1@saritasa.com',
    crypt('123', gen_salt('md5')),
    'Stephan',
    'King'
  );
INSERT INTO public."user" (id, email, password_hash, firstname, lastname) VALUES
(
    3,
    'student2@saritasa.com',
    crypt('123', gen_salt('md5')),
    'Stephan',
    'Peter'
  );
INSERT INTO public."user" (id, email, password_hash, firstname, lastname) VALUES
(
    4,
    'student3@saritasa.com',
    crypt('123', gen_salt('md5')),
    'Stephan',
    'A'
  );
INSERT INTO public."user" (id, email, password_hash, firstname, lastname) VALUES
(
    5,
    'student4@saritasa.com',
    crypt('123', gen_salt('md5')),
    'Stephan',
    'B'
  );
INSERT INTO public."user" (id, email, password_hash, firstname, lastname) VALUES
(
    6,
    'student5@saritasa.com',
    crypt('123', gen_salt('md5')),
    'Stephan',
    'C'
  );

INSERT INTO public."group"(name) VALUES ('English and life');
INSERT INTO public."group"(name) VALUES ('One day one vocabulary');

INSERT INTO public."user_group" (memberId, groupId, isAdmin) VALUES (1, 1, true);
INSERT INTO public."user_group" (memberId, groupId, isAdmin) VALUES (1, 2, true);
INSERT INTO public."user_group" (memberId, groupId, isAdmin) VALUES (2, 1, false);
INSERT INTO public."user_group" (memberId, groupId, isAdmin) VALUES (3, 1, false);
INSERT INTO public."user_group" (memberId, groupId, isAdmin) VALUES (4, 1, false);
INSERT INTO public."user_group" (memberId, groupId, isAdmin) VALUES (5, 2, false);

INSERT INTO public."task" (userId, name) VALUES (1, 'Animal');
INSERT INTO public."task" (userId, name) VALUES (1, 'Color');
INSERT INTO public."task" (userId, name) VALUES (1, 'School');
INSERT INTO public."task" (userId, name) VALUES (1, 'Number');

INSERT INTO public."task_group" (taskId, groupId, sentAt) VALUES(1, 1, '2022-12-31 23:12:59');
INSERT INTO public."task_group" (taskId, groupId, sentAt) VALUES(3, 2, '2023-01-30 14:10:22');
INSERT INTO public."task_group" (taskId, groupId, sentAt) VALUES(3, 1, '2022-07-22 21:21:44');

INSERT INTO public."word" (taskId, text) VALUES(1, 'Cat');
INSERT INTO public."word" (taskId, text) VALUES(1, 'Dog');
INSERT INTO public."word" (taskId, text) VALUES(1, 'Elephant');
INSERT INTO public."word" (taskId, text) VALUES(1, 'Hippo');
INSERT INTO public."word" (taskId, text) VALUES(2, 'Red');
INSERT INTO public."word" (taskId, text) VALUES(2, 'Green');
INSERT INTO public."word" (taskId, text) VALUES(2, 'Blue');
INSERT INTO public."word" (taskId, text) VALUES(3, 'Eraser');
INSERT INTO public."word" (taskId, text) VALUES(3, 'Pen');
INSERT INTO public."word" (taskId, text) VALUES(3, 'Book');
INSERT INTO public."word" (taskId, text) VALUES(4, 'One');
INSERT INTO public."word" (taskId, text) VALUES(4, 'Four');
INSERT INTO public."word" (taskId, text) VALUES(4, 'Seven');

INSERT INTO public."translation" (wordId, language, text) VALUES (1, 'Vietnamese', 'Con mèo');
INSERT INTO public."translation" (wordId, language, text) VALUES (2, 'Vietnamese', 'Con chó');
INSERT INTO public."translation" (wordId, language, text) VALUES (3, 'Vietnamese', 'Con voi');
INSERT INTO public."translation" (wordId, language, text) VALUES (4, 'Vietnamese', 'Con hà mã');
INSERT INTO public."translation" (wordId, language, text) VALUES (1, 'Russian', 'Кот');
INSERT INTO public."translation" (wordId, language, text) VALUES (2, 'Russian', 'Собака');
INSERT INTO public."translation" (wordId, language, text) VALUES (3, 'Russian', 'Слон');
INSERT INTO public."translation" (wordId, language, text) VALUES (4, 'Russian', 'Бегемот');
INSERT INTO public."translation" (wordId, language, text) VALUES (1, 'French', 'Chat');
INSERT INTO public."translation" (wordId, language, text) VALUES (3, 'French', 'Éléphant');
INSERT INTO public."translation" (wordId, language, text) VALUES (5, 'Vietnamese', 'Màu đỏ');
INSERT INTO public."translation" (wordId, language, text) VALUES (6, 'Vietnamese', 'Màu xanh lá');
INSERT INTO public."translation" (wordId, language, text) VALUES (7, 'Vietnamese', 'Màu xanh dương');
INSERT INTO public."translation" (wordId, language, text) VALUES (5, 'Vietnamese', 'Красный');
INSERT INTO public."translation" (wordId, language, text) VALUES (6, 'Vietnamese', 'Зеленый');
INSERT INTO public."translation" (wordId, language, text) VALUES (7, 'Vietnamese', 'Синий');
INSERT INTO public."translation" (wordId, language, text) VALUES (8, 'Vietnamese', 'Cục tẩy');
INSERT INTO public."translation" (wordId, language, text) VALUES (9, 'Vietnamese', 'Cây viết');
INSERT INTO public."translation" (wordId, language, text) VALUES (10, 'Vietnamese', 'Cuốn sách');
INSERT INTO public."translation" (wordId, language, text) VALUES (8, 'Russian', 'Ластик');
INSERT INTO public."translation" (wordId, language, text) VALUES (9, 'Russian', 'Ручка');
INSERT INTO public."translation" (wordId, language, text) VALUES (10, 'Russian', 'Книга');
INSERT INTO public."translation" (wordId, language, text) VALUES (11, 'Vietnamese', 'một');
INSERT INTO public."translation" (wordId, language, text) VALUES (12, 'Vietnamese', 'bốn');
INSERT INTO public."translation" (wordId, language, text) VALUES (13, 'Vietnamese', 'bảy');
INSERT INTO public."translation" (wordId, language, text) VALUES (11, 'Russian', 'один');
INSERT INTO public."translation" (wordId, language, text) VALUES (12, 'Russian', 'четыре');
INSERT INTO public."translation" (wordId, language, text) VALUES (13, 'Russian', 'Семь');

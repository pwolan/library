CREATE TABLE books (
  ID SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL
  author VARCHAR(255) NOT NULL,
  cover VARCHAR(255) NOT NULL,
  date BIGINT NOT NULL
);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  login VARCHAR(255) NOT NULL
  password VARCHAR(255) NOT NULL,
  mail VARCHAR(255) NOT NULL,
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

CREATE TYPE avatar 

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "password" VARCHAR(30) NOT NULL,
  "avatar" 
);
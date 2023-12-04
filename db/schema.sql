CREATE TABLE ingredients {
  id SERIAL,
  name VARCHAR(30) UNIQUE
}

CREATE TABLE recipes {
  id SERIAL,
  recipe_id INT UNIQUE
}

CREATE TABLE groceries {
  id SERIAL,
  name VARCHAR(30) UNIQUE
}
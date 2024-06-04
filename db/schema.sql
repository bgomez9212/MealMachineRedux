CREATE TABLE IF NOT EXISTS food (
  id SERIAL PRIMARY KEY,
  name VARCHAR(128) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS ingredients (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(128),
  food_id INT,
  date_added DATE,
  FOREIGN KEY (food_id) REFERENCES food(id),
  UNIQUE (user_id, food_id)
);

CREATE TABLE IF NOT EXISTS groceries (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(128),
  food_id INT,
  date_added DATE,
  FOREIGN KEY (food_id) REFERENCES food(id),
  UNIQUE (user_id, food_id)
);

CREATE TABLE IF NOT EXISTS savedRecipes (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(128),
  recipe_id INT,
  image VARCHAR(128),
  date_added DATE,
  title VARCHAR(128),
  UNIQUE (user_id, recipe_id)
);
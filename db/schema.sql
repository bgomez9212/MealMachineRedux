CREATE TABLE IF NOT EXISTS food (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS ingredients (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(128),
  food_id INT,
  ing_user_id VARCHAR(160) UNIQUE,
  date_added DATE,
  FOREIGN KEY (food_id) REFERENCES food(id)
);

CREATE TABLE IF NOT EXISTS groceries (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(128),
  food_id INT,
  gro_user_id VARCHAR(160) UNIQUE,
  date_added DATE,
  FOREIGN KEY (food_id) REFERENCES food(id)
);

CREATE TABLE IF NOT EXISTS savedRecipes (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(128),
  recipe_id INT
);
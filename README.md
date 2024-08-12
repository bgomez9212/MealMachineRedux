# Hello and welcome to MealMachine. 

### Looking to run this project locally?

#### Define the environment variables.

Navigate to the app directory.
Locate the .env.example in the app directory, copy and paste into a new .env file in the app directory.

The first 7 environment variables come from [Firebase](https://firebase.google.com/).
    Head over to Firebase and create a new project and add authentication.
    On the left sidebar, click on the gear (settings) next to project overview and scroll down to obtain your firebase config variables.
  The server variables are the urls you will use to communicate with the server. They will look like: `http://localhost:<PORT>/api/<endpointIncludedInVariableName>`

Navigate to the server directory.
Locate the .env.example file in this directory, copy and paste into a new .env file.
  This project uses a [PostgreSQL database](https://www.postgresql.org/download/).
  The first 7 variables come from your Postgres configuration. 
    DB_PORT is the port your server is using to communicate with Postgres, whereas PORT is the port your server is accepting requests from.
    API_KEY comes from the [Spoonacular API](https://spoonacular.com/food-api/console#Dashboard).

### Create the database.

To build the Postgres database, in your terminal open Postgres `psql`.
  Create a new database (make sure the name you give this database matches your DB variable in .env).
  Connect to this database `\c <db name>` and run `\i <path to MealMachineRedux/db/schema.sql>` to create the tables in your database.
The database is now set up according to the project.

### Install necessary packages.

Within the app directory and then the server directory, run `npm i`.

### Start the server and the client.

This will be done in two separate terminals.
  In one terminal navigate to the server directory and run `npm run server`.
  In the other terminal navigate to the app directory and run `npm run dev`.

# What is MealMachine?
A recipe suggestion service where users can use the ingredients they have available to find recipes. Users create their inventory of ingredients, are suggested recipes where they a missing a minimal amount of ingredients, then can create grocery lists based off of their missing ingredients. User's can also manually search for recipes, which will be displayed in order of least missing ingredients, and can save recipes for later. Other features include responsive design, light and dark modes, and infinite scrolling.


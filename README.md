Hosted version - https://brand-news.netlify.app/

## About the this project:
This project is a news website which features articles related to the tech industry. Users can view all articles in a list, then selct and article to read which will take them to the article page. Once on the article page, they will be able to upvote, leave comments on the articles and view comments from other users.

## How to clone this project
fork this repo, then in your terminal, use the command:
git clone <forkedRepoURL>

## How to Install dependencies
Run:
npm install

## How to seed the local database
Run:
npm run seed

## How to run tests
Ensure your console shows that you are in the file named __tests__ and use the command npm test <app.test.js OR utils.test.js> depending on which test file you are using.

## How to create .env files
You will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

## Minimum versions of Node.js and Postgres needed:
Node: v19.6.0
Postgres: 1.36-5.2
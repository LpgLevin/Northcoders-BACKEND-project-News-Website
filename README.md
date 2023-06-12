## NC News: Lily's News API (The Backend portion of my Northcoders solo project)

## About the this project:
This project is a news website which features articles related to the tech industry. Users can view all articles in a list, then selct and article to read which will take them to the article page. Once on the article page, they will be able to upvote, leave comments on the articles and view comments from other users.

## Hosted version
You can find the hosted version of this API by using the following URL 

    https://lilybackendncnews.onrender.com/api



## Set-up and installation

## Minimum versions of Node.js and Postgres needed:
Node: v19.6.0
PostgreSQL: v13.0

## How to clone this project
In your terminal, use the command:
    
    git clone https://github.com/LpgLevin/Northcoders-BACKEND-project-News-Website.git

## How to Install dependencies
Navigate to the root directory of the repository and run this command:

    npm install

## How to create .env files
You will need to create two .env files for your project: .env.test and .env.development. Into each, add 
    
    PGDATABASE=<database_name_here> 

with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

## How to seed the local database
Also in the root directory, run the following commands:

    npm setup-dbs
    npm run seed


## How to run tests
Ensure your terminal shows that you are in the file named __tests__ and use the command npm test <app.test.js OR utils.test.js> depending on which test file you are using.
The test database is automatically created and seeded when running tests.


## This API includes the following endpoints:

GET
    - /api
    - /api/users
    - /api/topics
    - /api/articles
    - /api/articles/:article_id
    - /api/articles/:article_id/comments

PATCH
    - /api/articles/:article_id":

POST
    - /api/articles/:article_id/comments

DELETE
    - /api/articles/:comment_id

To use these endpoints, append the appropriate endpoint to the following URL:
    
    https://lilybackendncnews.onrender.com/api

For example, get all articles, send a GET request to:

    https://lilybackendncnews.onrender.com/api/articles

For more detailed  information on each endpoint, please refer to the endpoints.json file in this repository.git 

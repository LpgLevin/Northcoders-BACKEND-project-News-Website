const express = require('express');
const { getTopics, getArticleById } = require('./controllers/topics.controller')
const { invalidPathwayError, customError, psqlError400, serverError500 } = require('./controllers/errors.controller');



const app = express();

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);

app.all('/*', invalidPathwayError);

app.use(customError);

app.use(psqlError400);

app.use(serverError500);

module.exports = app;
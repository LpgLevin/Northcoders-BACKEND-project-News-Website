const express = require('express');
const { getTopics, getArticleById, getArticlesInOrder, getCommentsById } = require('./controllers/topics.controller')
const { invalidPathwayError, customError, psqlError400, serverError500 } = require('./controllers/errors.controller');



const app = express();

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles', getArticlesInOrder)

app.get('/api/article/:article_id/comments', getCommentsById)

app.post('/api/articles/:article_id/comments')

app.all('/*', invalidPathwayError);

app.use(customError);

app.use(psqlError400);

app.use(serverError500);

module.exports = app;
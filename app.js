const express = require('express');
const { getTopics, getArticleById, getArticlesInOrder, getCommentsById, postComment, patchVotes, deleteComments, getUsers } = require('./controllers/topics.controller')
const { invalidPathwayError, customError, psqlError400, serverError500 } = require('./controllers/errors.controller');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());



app.get('/api', (req, res, next) => {
    res.status(200).json(require(`${__dirname}/endpoints.json`));

});

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles', getArticlesInOrder);

app.get('/api/articles/:article_id/comments', getCommentsById);

app.post('/api/articles/:article_id/comments', postComment);

app.patch('/api/articles/:article_id', patchVotes);

app.delete('/api/comments/:comment_id', deleteComments);



app.get('/api/users', getUsers)

app.all('/*', invalidPathwayError);

app.use(customError);

app.use(psqlError400);

app.use(serverError500);



module.exports = app;
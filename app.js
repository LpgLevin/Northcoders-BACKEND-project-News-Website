const express = require('express');
const { getTopics } = require('./controllers/topics.controller')
const { invalidPathwayError} = require('./controllers/errors.controller');

const app = express();

app.get('/api/topics', getTopics);

app.all('/*', invalidPathwayError);

module.exports = app;
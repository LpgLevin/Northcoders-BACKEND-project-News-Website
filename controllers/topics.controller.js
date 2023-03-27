const { selectTopics } = require('../models/topics.model');

exports.getTopics = (request, response, next) =>{

    selectTopics()
    .then((arrayOfTopics) => { response.status(200).send({ topics : arrayOfTopics })})
    .catch(next);
};
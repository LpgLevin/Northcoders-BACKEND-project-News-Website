const { selectTopics, selectArticleById, selectArticlesInOrder } = require('../models/topics.model');

exports.getTopics = (request, response, next) =>{

    selectTopics()
    .then((arrayOfTopics) => { response.status(200).send({ topics : arrayOfTopics })})
    .catch(next);
};

exports.getArticleById = (request, response, next) => {

    const { article_id } = request.params;

    selectArticleById(article_id)
    .then((articleObject) => {
        response.status(200)
        .send({ articleObject })
       
    })

    .catch((err) => {

        next(err);

    });
};

exports.getArticlesInOrder = (request, response, next) => {
    selectArticlesInOrder()
    .then((articles) => {
        response.status(200)
        .send({ articles })
       
    })

    .catch((err) => {

        next(err);

    });

};

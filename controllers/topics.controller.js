const { selectTopics, selectArticleById, selectArticlesInOrder, selectCommentsById, postCommentById } = require('../models/topics.model');

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


exports.getCommentsById = (request, response, next) => {

    const { article_id } = request.params;

    selectCommentsById(article_id)
    .then((commentArray) => {
        response.status(200)
        .send({ commentArray })
       
    })

    .catch((err) => {

        next(err);

    });
};

exports.postComment = (request, response, next) => {

    const { article_id } = request.params;

    const { username, body } = request.body;


    console.log('in the controller', request.body);

    postCommentById( username, body, article_id )
    .then((comment) => {
        response.status(201)
        .send({ comment })
       
    })

    .catch((err) => {

        next(err);

    });
};


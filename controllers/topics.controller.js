const { selectTopics, selectArticleById, selectArticlesInOrder, selectCommentsById, postCommentById, patchVotesById, deleteCommentsById, selectCommentByCommentId, selectUsers} = require('../models/topics.model');

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



// /api/articles?order=ascending

// req.query would have a key of order and a value of asc { order: 'asc'}

// const { order } = req.query;

exports.getArticlesInOrder = (request, response, next) => {



    const { order, sort_by, topic } = request.query;

    

    selectArticlesInOrder(order, sort_by, topic)
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

    postCommentById( username, body, article_id )
    .then((comment) => {
        response.status(201)
        .send({ comment })
       
    })

    .catch((err) => {

        next(err);

    });
};


exports.patchVotes = (request, response, next) => {

    const { article_id } = request.params;

    const { inc_votes } = request.body;

    patchVotesById( inc_votes, article_id )
    .then((updatedArticle) => {
        response.status(201)
        .send({ updatedArticle })
       
    })

    .catch((err) => {

        next(err);

    });

};

exports.deleteComments = (request, response, next) => {

    const { comment_id } = request.params;

    selectCommentByCommentId( comment_id )
    .then(() => {

        deleteCommentsById( comment_id )
        .then(() => {
            response.status(204)
            .send()
           
        })

    })
    .catch((err) => {

        next(err);

    });

};


exports.getUsers = (request, response, next) =>{

    selectUsers()
    .then((arrayOfUsers) => { response.status(200).send({ users : arrayOfUsers })})
    .catch(next);

};
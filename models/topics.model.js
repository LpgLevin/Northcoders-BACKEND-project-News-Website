const db = require('../db/connection');

exports.selectTopics = () => {

    return db.query(`SELECT * FROM topics;`)
    .then((result) => { return result.rows });

};

exports.selectArticleById = (article_id) => {

    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then((result) => {

        if(result.rowCount === 0) {

            return Promise.reject({ status: 404, message: 'article not found'});
        }
        return result.rows;
    });
};

exports.selectArticlesInOrder = () => {

    return db.query(`
    SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, 
    COUNT(comments.comment_id) 
    AS comment_count 
    FROM articles 
    LEFT JOIN comments 
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id 
    ORDER BY articles.created_at DESC;`)
    .then((result) => {

        return result.rows;
    });


};

exports.selectCommentsById = (article_id) => {

    return db.query(`
    SELECT comment_id, votes, created_at, author, body, article_id 
    FROM comments 
    WHERE article_id = $1
    ORDER BY created_at DESC`, [article_id])
    .then((result) => {

        if(result.rowCount === 0) {

            return Promise.reject({ status: 404, message: 'article not found'});
        }

        return result.rows;
    });
};
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



//user needs to be able to change what its sorted by or only fetch from one topic.

// /api/articles?sort_by=votes&order=ascending ----sorts articles in ascending oreder by number of votes

// /api/articles?topic=cats ---this would be returning a list of all the article with a topic of cats

// /api/articles?topic=cats&sort_by=votes  ---this would get all the cats articles in order of how many votes they have. default - desc



exports.selectArticlesInOrder = ( order = 'DESC', column = 'created_at') => {
  
        let sql = `
    SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, 
    COUNT(comments.comment_id) 
    AS comment_count 
    FROM articles 
    LEFT JOIN comments 
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id` 


    ///api/articles?sort_by=votes

    // greenlist -----apply to columns not topics ----will need selectTopics

    const validOrders = ['ASC', 'DESC']

    const validColumns = ['topic', 'author', 'body', 'created_at', 'votes',]


    if(validOrders.includes(order) && validColumns.includes(column)){ 
        
        sql += ` ORDER BY articles.${column} ${order};` 
    }   


    else {


        return Promise.reject({ status: 400, message: 'invalid query'});
    
       
    }

    return db.query(sql)

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

exports.postCommentById = ( username, body, article_id ) => {

    return db.query(`
    INSERT INTO comments (author, body, article_id)
    VALUES ($1, $2, $3)
    RETURNING*;`, [username, body, article_id])

    .then((result) => {

        return result.rows[0];

    });
};

exports.patchVotesById = ( inc_votes, article_id ) => {

    return db.query(`
    UPDATE articles 
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING*;`, [inc_votes, article_id])

    .then((result) => {

        if(result.rowCount === 0) {

            return Promise.reject({ status: 404, message: 'article not found'});
        }

        return result.rows[0];

    });
};

exports.deleteCommentsById = ( comment_id ) => {

    return db.query(`
    DELETE FROM comments 
    WHERE comment_id = $1
    RETURNING*;`, [comment_id])

    .then((result) => {

        return result.rows[0];

    });

};


exports.selectCommentByCommentId = (comment_id) => {

    return db.query(`SELECT * FROM comments WHERE comment_id = $1`, [comment_id])
    .then((result) => {

        if(result.rowCount === 0) {

            return Promise.reject({ status: 404, message: 'not found'});
        }
        return result.rows;
    });
};
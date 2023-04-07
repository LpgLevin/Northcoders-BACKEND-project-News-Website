const db = require('../db/connection');

exports.selectTopics = () => {

    return db.query(`SELECT * FROM topics;`)
    .then((result) => { return result.rows });

};

exports.selectArticleById = (article_id) => {

    return db.query(`
    SELECT articles.*,
    CAST(COUNT(comments.comment_id)AS INTEGER)
    AS comment_count 
    FROM articles 
    LEFT JOIN comments 
    ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id`, [article_id])
    .then((result) => {

        if(result.rowCount === 0) {

            return Promise.reject({ status: 404, message: 'article not found'});
        }

        return result.rows;
    });
};


exports.selectArticlesInOrder = ( order = 'DESC', column = 'created_at', topic) => {

    const sqlArgArray = [];
  
 let sql = `
    SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, 
    COUNT(comments.comment_id) 
    AS comment_count FROM articles 
    LEFT JOIN comments 
    ON articles.article_id = comments.article_id` 

    if(topic){

        sqlArgArray.push(topic);

        sql += ` WHERE articles.topic = $1`;

    };

    sql += ` 
    GROUP BY articles.article_id`

    const validOrders = ['ASC', 'DESC']

    const validColumns = ['topic', 'author', 'body', 'created_at', 'votes',]


    if(validOrders.includes(order) && validColumns.includes(column)){ 
        
        sql += ` ORDER BY articles.${column} ${order};` 
    }   


    else {


        return Promise.reject({ status: 400, message: 'invalid query'});
    
       
    }


    return db.query(sql, sqlArgArray)

    .then((result) => {
        
        if(result.rowCount === 0) {

            return Promise.reject({ status: 404, message: 'topic not found'});
        }

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

exports.selectUsers = () => {

    return db.query(`SELECT * FROM users;`)
    .then((result) => { return result.rows });

};
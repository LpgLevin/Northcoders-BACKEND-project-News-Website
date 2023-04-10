const superTest = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

beforeEach(() => {return seed(testData)});
afterAll(() => { return db.end() });


describe('3. GET /api/topics', function(){

    describe('200s', function(){

        test('GET 200: returns an object with a key of topics', function(){

            return superTest(app)
            .get('/api/topics')
            .expect(200)
            .then((response) => {

                expect(Object.keys(response.body)).toEqual(['topics']);

            });
        });

        test('GET 200: they topics key in the returned object should have an array as its value', function(){

            return superTest(app)
            .get('/api/topics')
            .expect(200)
            .then((response) => {

                expect(response.body.topics).toBeInstanceOf(Array);

            });
        });
    

        test('GET 200:the array in the response object should have the correct length and each object in the topics array should have two keys, description and slug, whose values will be strings', function(){

            return superTest(app)
            .get('/api/topics')
            .expect(200)
            .then((response) => {

                expect(response.body.topics).toHaveLength(3);

                response.body.topics.forEach((topic) => {

                    expect(topic).toMatchObject({ description: expect.any(String), slug: expect.any(String)})

                });

            });
        

        });

    });


    describe('error handling', function(){

        test('404: responds with an error message when passed an invalid pathway or typo', function(){

            return superTest(app)
            .get('/api/toppics')
            .expect(404)
            .then(({ body }) =>{
                expect(body.message).toBe('invalid pathway');

            });

        });

    });

});


describe('4. (12) GET /api/articles/:article_id', function(){

    describe('200s', function(){

        test('GET 200: returns an article object', function(){

            return superTest(app)
            .get('/api/articles/9')
            .expect(200)
            .then((response) => {

                expect(response.body).toBeInstanceOf(Object);

            });
        });


        test('GET 200: returns an article object which has author, title, article_id, body, topic, created_at, votes, article_img_url and (12)-comment_count keys containing the correct data types', function(){

            return superTest(app)
            .get('/api/articles/9')
            .expect(200)
            .then((response) => {

                expect(response.body.articleObject[0]).toMatchObject({ 

                    article_id: expect.any(Number),
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String), 
                    body: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    comment_count: 2
                
                });

                

            });


        });

        test('GET 200: returns the article object which corresponds with the article_id passed in', function(){

            return superTest(app)
            .get('/api/articles/9')
            .expect(200)
            .then((response) => {

                const articleObject =  {
                    article_id: 9,
                    title: "They're not exactly dogs, are they?",
                    topic: 'mitch',
                    author: 'butter_bridge',
                    body: 'Well? Think about it.',
                    created_at: "2020-06-06T09:10:00.000Z",
                    votes: 0,
                    article_img_url:
                      'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
                    comment_count: 2
                  };

                expect(response.body.articleObject[0]).toEqual(articleObject);

            });

        });

        
    });


    describe('error handling', function(){

        test('GET 404: returns 404 and a message, "article not found" when article_id passed in is valid but non existent', function(){

            return superTest(app)
            .get('/api/articles/9350')
            .expect(404)
            .then((response) => {

                expect(response.body).toEqual({ message: 'article not found' });

            });

        });

        test('GET 400: returns 400 and a message, "invalid id" when article_id passed in is not a number', function(){

            return superTest(app)
            .get('/api/articles/notANumber')
            .expect(400)
            .then((response) => {

                expect(response.body).toEqual({ message: 'invalid id' });

            });

        });

            
    });

});


describe('5. GET /api/articles', function(){

    describe('200s', function(){

        test('GET 200: returns an object with a key of articles', function(){

            return superTest(app)
            .get('/api/articles')
            .expect(200)
            .then((response) => {

                expect(Object.keys(response.body)).toEqual(['articles']);

            });

        });

        test('GET 200: the articles key in the returned object should have an array as its value', function(){

            return superTest(app)
            .get('/api/articles')
            .expect(200)
            .then((response) => {

                expect(response.body.articles).toBeInstanceOf(Array);

            });

        });
    
        test('GET 200: the array in the response object have the correct length and each object in the articles array should have eight keys: author, title, article_id, topic, created_at, votes, article_img_url and comment_count keys containing the correct data types', function(){

            return superTest(app)
            .get('/api/articles')
            .expect(200)
            .then((response) => {

                expect(response.body.articles).toHaveLength(12);

                response.body.articles.forEach((articleObj) => {

                    expect(articleObj).toMatchObject({ 

                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String), 
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(String)
                    
                    });


                });

                
            });


        });

        test('GET 200: the article objects in the array should be sorted by date in descending order', function(){

            return superTest(app)
            .get('/api/articles')
            .expect(200)
            .then((response) => {

                expect(response.body.articles).toBeSortedBy('created_at', {
                    descending: true
                    
                });

            });

        });


    });


    describe('error handling', function(){

        test('404: responds with an error message when passed an invalid pathway or typo', function(){

            return superTest(app)
            .get('/api/arTICKLES')
            .expect(404)
            .then(({ body }) =>{
                expect(body.message).toBe('invalid pathway');

            });

        });

    });
    
});


describe('11. /api/articles queries 200s', function(){

    describe('200s', function(){

        test('GET 200: when prompted, the articles are returned in ascending order', function(){

            return superTest(app)
            .get('/api/articles?order=ASC')
            .expect(200)
            .then((response) => {

                expect(response.body.articles).toBeSortedBy('created_at', 
                {
                    ascending: true
                    
                });

            });

        });

        test('GET 200: sorts articles by a particular column', function(){

            return superTest(app)
            .get('/api/articles?sort_by=votes')
            .expect(200)
            .then((response) => {

                expect(response.body.articles).toBeSortedBy('votes', 
                {
                    descending: true
                    
                });
            });
        });

        test('GET 200: filters articles by topic', function(){

            return superTest(app)
            .get('/api/articles?topic=cats')
            .expect(200)
            .then((response) => {

                expect(response.body.articles).toHaveLength(1);
                
                expect(response.body.articles[0]).toMatchObject({ 

                    article_id: expect.any(Number),
                    title: expect.any(String),
                    topic: 'cats',
                    author: expect.any(String), 
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    comment_count: expect.any(String)
                
                });
            });
        });

    });

    describe('queries errors', function(){

        test('400: responds with an error message "invalid query" when passed an invalid order', function(){

            return superTest(app)
            .get('/api/articles?order=ASS')
            .expect(400)
            .then(({ body }) =>{
                expect(body.message).toBe('invalid query');

            });

        });

        test('400: responds with an error message "invalid query" when passed an invalid column', function(){

            return superTest(app)
            .get('/api/articles?sort_by=boats')
            .expect(400)
            .then(({ body }) =>{
                expect(body.message).toBe('invalid query');

            });

        });

        test('400: responds with an error message "topic not found" when passed an invalid topic', function(){

            return superTest(app)
            .get('/api/articles?topic=catss')
            .expect(404)
            .then(({ body }) =>{
                expect(body.message).toBe('topic not found');

            });

        });



    });

});


describe('6. GET /api/articles/:article_id/comments', function(){

    describe('200s', function(){

        test('GET 200: returns an array of comment objects', function(){

            return superTest(app)
            .get('/api/articles/9/comments')
            .expect(200)
            .then((response) => {

                expect(response.body.commentArray).toBeInstanceOf(Array);
                expect(response.body.commentArray[0]).toBeInstanceOf(Object);

            });
        });


        test('GET 200: returns an array of comment objects which is the correct length and has the following properties: comment_id, votes, created_at, author, body, article_id', function(){

            return superTest(app)
            .get('/api/articles/9/comments')
            .expect(200)
            .then((response) => {

                expect(response.body.commentArray).toHaveLength(2);

                expect(response.body.commentArray[0]).toMatchObject({ 

                    comment_id: expect.any(Number),
                    article_id: expect.any(Number),
                    author: expect.any(String), 
                    body: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number)
                
                });                

            });

        });

        test('GET 200: comment objects in the returned array should be ordered from most recent to oldest.', function(){

            return superTest(app)
            .get('/api/articles/9/comments')
            .expect(200)
            .then((response) => {

                expect(response.body.commentArray).toBeSortedBy('created_at', {
                    descending: true,
                    
                });

            });

        });

        test('GET 200: returns the array of comment objects which corresponds with the article_id passed in', function(){

            return superTest(app)
            .get('/api/articles/9/comments')
            .expect(200)
            .then((response) => {

                expect(response.body.commentArray[0].article_id).toEqual(9);

            });

        });

        
    });


    describe('error handling', function(){

        test('GET 404: returns 404 and a message, "article not found" when article_id passed in is valid but non existent', function(){

            return superTest(app)
            .get('/api/articles/7098/comments')
            .expect(404)
            .then((response) => {

                expect(response.body).toEqual({ message: 'article not found' });

            });

        });

        test('GET 400: returns 400 and a message, "invalid id" when article_id passed in is not a number', function(){

            return superTest(app)
            .get('/api/articles/notANumber/comments')
            .expect(400)
            .then((response) => {

                expect(response.body).toEqual({ message: 'invalid id' });

            });

        });

            
    });

});


describe('7. POST /api/articles/:article_id/comments', function(){

    describe('201s', function(){

        test('POST 201: responds with a posted json comment object?', function(){

            return superTest(app)
            .post('/api/articles/9/comments')
            .send({ username: 'icellusedkars', body: 'This is my comment' })
            .expect(201)
            .then((response) => {

                expect(response.body.comment).toBeInstanceOf(Object);

            });

        });


        test('POST 201: has a key of comment with a value of the comment object entered.', function(){

            return superTest(app)
            .post('/api/articles/9/comments')
            .send({username: 'icellusedkars', body: 'This is my comment'})
            .expect(201)
            .then((response) => {

                expect(response.body.comment).toMatchObject({ 

                    comment_id: expect.any(Number),
                    article_id: expect.any(Number),
                    author: expect.any(String), 
                    body: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number)

            
                });                

            });

        });

        test('POST 201: ignores any unnecessary keys entered.', function(){

            return superTest(app)
            .post('/api/articles/9/comments')
            .send( { username: 'icellusedkars', body: 'This is my comment', phoneNumber: '07836264859' } )
            .expect(201)
            .then((response) => {

                expect(response.body.comment).toMatchObject({ 

                    comment_id: expect.any(Number),
                    article_id: expect.any(Number),
                    author: expect.any(String), 
                    body: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number)

            
                });                

            });

        });


    });


    describe('error handling', function(){

        test('POST 404: returns 404 and a message, "not found" when article_id passed in is valid but non existent', function(){

            return superTest(app)
            .post('/api/articles/7098/comments')
            .send({username: 'icellusedkars', body: 'This is my comment'})
            .expect(404)
            .then((response) => {

                expect(response.body).toEqual({ message: 'not found' });

            });

        });

        test('POST 404: returns 404 and a message, "not found" when username entered is not a username', function(){

            return superTest(app)
            .post('/api/articles/7098/comments')
            .send({username: 'LilyIsTheBest', body: 'This is my comment'})
            .expect(404)
            .then((response) => {

                expect(response.body).toEqual({ message: 'not found' });

            });

        });

        test('POST 404: returns 404 and a message, "not found" when there is no username OR no body', function(){

            return superTest(app)
            .post('/api/articles/7098/comments')
            .send({username: 'icellusedkars'})
            .expect(404)
            .then((response) => {

                expect(response.body).toEqual({ message: 'missing property' });

            });

        });


        test('GET 400: returns 400 and a message, "invalid id" when article_id passed in is not a number', function(){

            return superTest(app)
            .post('/api/articles/notANumber/comments')
            .send({username: 'icellusedkars', body: 'This is my comment'})
            .expect(400)
            .then((response) => {

                expect(response.body).toEqual({ message: 'invalid id' });

            });

        });

            
    });

});


describe('8. PATCH /api/articles/:article_id', function(){

    describe('201s', function(){

        test('PATCH 201: responds with an object', function(){

            return superTest(app)
            .patch('/api/articles/1')
            .send({ inc_votes: 1 })
            .expect(201)
            .then((response) => {

                expect(response.body.updatedArticle).toBeInstanceOf(Object);

            });

        });

        test('PATCH 201: responds with the updated article', function(){

            return superTest(app)
            .patch('/api/articles/1')
            .send({ inc_votes: 1 })
            .expect(201)
            .then((response) => {

                expect(response.body.updatedArticle.votes).toBe(101);

                expect(response.body.updatedArticle).toMatchObject({ 

                    article_id: 1,
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String), 
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String)
                
                });

            });

        });


    });


    describe('error handling', function(){


        test('PATCH 404: returns 404 and a message, "article not found" when article_id passed in is valid but non existent', function(){

            return superTest(app)
            .patch('/api/articles/7098')
            .send({ inc_votes: 1 })
            .expect(404)
            .then((response) => {

                expect(response.body).toEqual({ message: 'article not found' });

            });

        });


        test('PATCH 404: returns 404 and a message, "missing property" when there is no key', function(){

            return superTest(app)
            .patch('/api/articles/1')
            .send({})
            .expect(404)
            .then((response) => {

                expect(response.body).toEqual({ message: 'missing property' });

            });

        });


        test('PATCH 400: returns 400 and a message, "invalid id" when article_id passed in is not a number', function(){

            return superTest(app)
            .patch('/api/articles/notANumber')
            .send({ inc_votes: 1 })
            .expect(400)
            .then((response) => {

                expect(response.body).toEqual({ message: 'invalid id' });

            });


        });


    });


});


describe('9. DELETE /api/comments/:comment_id', function(){

    describe('204s', function(){

        test('DELETE 204: responds 204', function(){

            return superTest(app)
            .delete('/api/comments/1')
            .expect(204)
            .then((response) => {

                return db.query(`
                SELECT * 
                FROM comments 
                WHERE comment_id = 1;`)
            })

            .then((result) => {

                expect(result.rows).toHaveLength(0);
            })

        });

        
    });


    describe('error handling', function(){


        test('DELETE 404: returns 404 and a message, "not found" when comment_id passed in is valid but non existent', function(){

            return superTest(app)
            .delete('/api/comments/7809')
            .expect(404)
            .then((response) => {

                expect(response.body).toEqual({ message: 'not found' });

            });

        });


        test('DELETE 400: returns 400 and a message, "invalid id" when comment_id passed in is not a number', function(){

            return superTest(app)
            .delete('/api/comments/notANumber')
            .expect(400)
            .then((response) => {

                expect(response.body).toEqual({ message: 'invalid id' });

            });


        });


    });

});
  

describe('10. GET /api/users', function(){

    describe('200s', function(){

        test('GET 200: returns an object with a key of users', function(){

            return superTest(app)
            .get('/api/users')
            .expect(200)
            .then((response) => {

                expect(Object.keys(response.body)).toEqual(['users']);

            });
        });

        test('GET 200: the users key in the returned object should have an array as its value', function(){

            return superTest(app)
            .get('/api/users')
            .expect(200)
            .then((response) => {

                expect(response.body.users).toBeInstanceOf(Array);

            });
        });
    

        test('GET 200: the array in the response object should have the correct length and each object in the users array should have three keys, username, name and avatar_url, whose values will be strings', function(){

            return superTest(app)
            .get('/api/users')
            .expect(200)
            .then((response) => {

                expect(response.body.users).toHaveLength(4);

                response.body.users.forEach((user) => {

                    expect(user).toMatchObject({ 

                        username: expect.any(String), 
                        name: expect.any(String), 
                        avatar_url: expect.any(String)
                    })

                });

            });
        

        });

    });


    describe('error handling', function(){

        test('404: responds with an error message when passed an invalid pathway or typo', function(){

            return superTest(app)
            .get('/api/userz')
            .expect(404)
            .then(({ body }) =>{
                expect(body.message).toBe('invalid pathway');

            });

        });

    });

});

describe('13. GET /api', function(){

    test('returns a json object describing all the available endpoints on the api', function(){

        return superTest(app)
        .get('/api')
        .expect(200)
        .then((response) => {

            expect(Object.keys(response.body)).toEqual(["endPoints"]);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.endPoints).toBeInstanceOf(Array);
            expect(response.body.endPoints[0]).toBeInstanceOf(Object);


        });


    });

});
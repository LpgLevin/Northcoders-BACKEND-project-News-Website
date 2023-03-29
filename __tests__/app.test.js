const superTest = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

beforeEach(() => {return seed(testData)});
afterAll(() => { return db.end() });


describe('/api/topics', function(){

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





describe('/api/articles/:article_id', function(){

    describe('200s', function(){

        test('GET 200: returns an article object', function(){

            return superTest(app)
            .get('/api/articles/9')
            .expect(200)
            .then((response) => {

                expect(response.body).toBeInstanceOf(Object);

            });
        });


        test('GET 200: returns an article object which has author, title, article_id, body, topic, created_at, votes and article_img_url keys containing the correct data types', function(){

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
                    article_img_url: expect.any(String)
                
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


describe('/api/articles', function(){

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
                    descending: true,
                    
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

describe('/api/article/:article_id/comments', function(){

    describe('200s', function(){

        test('GET 200: returns an array of comment objects', function(){

            return superTest(app)
            .get('/api/article/9/comments')
            .expect(200)
            .then((response) => {

                expect(response.body.commentArray).toBeInstanceOf(Array);
                expect(response.body.commentArray[0]).toBeInstanceOf(Object);

            });
        });


        test('GET 200: returns an array of comment objects which is the correct length and has the following properties: comment_id, votes, created_at, author, body, article_id', function(){

            return superTest(app)
            .get('/api/article/9/comments')
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
            .get('/api/article/9/comments')
            .expect(200)
            .then((response) => {

                expect(response.body.commentArray).toBeSortedBy('created_at', {
                    descending: true,
                    
                });

            });

        });

        test('GET 200: returns the array of comment objects which corresponds with the article_id passed in', function(){

            return superTest(app)
            .get('/api/article/9/comments')
            .expect(200)
            .then((response) => {

                expect(response.body.commentArray[0].article_id).toEqual(9);

            });

        });

        
    });


    describe('error handling', function(){

        test('GET 404: returns 404 and a message, "article not found" when article_id passed in is valid but non existent', function(){

            return superTest(app)
            .get('/api/article/7098/comments')
            .expect(404)
            .then((response) => {

                expect(response.body).toEqual({ message: 'article not found' });

            });

        });

        test('GET 400: returns 400 and a message, "invalid id" when article_id passed in is not a number', function(){

            return superTest(app)
            .get('/api/article/notANumber/comments')
            .expect(400)
            .then((response) => {

                expect(response.body).toEqual({ message: 'invalid id' });

            });

        });

            
    });

});
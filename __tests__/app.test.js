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

                console.log(response.body.topics);

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

        test('GET 200: the array in the response object should populated by topics objects and have the correct length', function(){

            return superTest(app)
            .get('/api/topics')
            .expect(200)
            .then((response) => {

                expect(response.body.topics).toHaveLength(3);
            });

        });
    

        test('GET 200: each object in the topics array should have two keys, description and slug, whose values will be strings', function(){

            return superTest(app)
            .get('/api/topics')
            .expect(200)
            .then((response) => {

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
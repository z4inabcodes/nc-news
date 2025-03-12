const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const  data = require("../db/data/test-data/index")
const request = require("supertest")
const app = require("../app")
const endpointsJson = require('../endpoints.json')

beforeEach(() => seed(data))

afterAll(() => db.end())

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
       
        expect(endpoints).toEqual(endpointsJson);
     
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Responds with an array of correctly formatted topics objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics.length).toBe(3);
        body.topics.forEach((topic)=>{
          expect(typeof topic.slug).toBe('string');
          expect(topic.description.length).toBeGreaterThan(0);
        })
      });
  });
  test("404: Responds with a 404 when incorrect endpoint is added", () => {
    return request(app)
      .get("/api/toopics")
      .expect(404)
      .then(({body})=>{
        expect(body.msg).toBe('Wrong Endpoint!')

      })
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: Responds an correctly formatted article object by id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {

        expect(body.article).toEqual(
          expect.objectContaining(  {
            article_id: 1,
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: '2020-07-09T20:11:00.000Z',
            votes: 100,
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
          })
        )
       
      });
  });
  test("404: Responds with a 404 when incorrect id is added", () => {
    return request(app)
      .get("/api/articles/14")
      .expect(404)
      .then(({body})=>{
        expect(body.msg).toBe('Article not found!')

      })
  });
 
});
describe("GET /api/articles", () => {
  test("200: Responds with an array of correctly formatted articles objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body:{articles} }) => {
        expect(articles.length).toBe(13);
        articles.forEach((article)=>{
           expect(article).toEqual({
                               author: expect.any(String),
                              title: expect.any(String),
                              article_id: expect.any(Number),
                              topic:expect.any(String),
                              created_at: expect.any(String),
                              votes:  expect.any(Number),
                              article_img_url: expect.any(String),
                              comment_count: expect.any(Number)})
        })
        })
      });
      test("404: Responds with a 404 when incorrect id is added", () => {
        return request(app)
          .get("/api/articleees")
          .expect(404)
          .then(({body})=>{
            expect(body.msg).toBe('Wrong Endpoint!')
    
          })})
  });

  describe('GET /api/articles/:article_id/comments',()=>{
    test('200: returns an array of comment object with the desired article id',()=>{
      return request(app)
      .get('/api/articles/3/comments')
      .expect(200)
      .then(({body:{comments}})=>{
        expect(Array.isArray(comments)).toBe(true);
        comments.forEach((comment)=>{
          expect(comment).toEqual({
           comment_id:expect.any(Number),
           article_id:expect.any(Number),
           body: expect.any(String),
           votes: expect.any(Number),
           author: expect.any(String),
           created_at: expect.any(String)
         })

      })
    })})

    test("404: Responds with a 404 when incorrect article id is added", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(404)
        .then(({body})=>{
          expect(body.msg).toBe('Article not found!')
  
        })
    });

    test("400: Responds with a 400 when incorrect article id is added", () => {
      return request(app)
        .get("/api/articles/'15555'/comments")
        .expect(400)
        .then(({body})=>{
          expect(body.msg).toBe('Invalid article ID!')
  
        })
    });
  })




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
        console.log(body.topics,'vcyd')
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
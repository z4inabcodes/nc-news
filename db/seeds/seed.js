const db = require("../connection")
const articles = require("../data/development-data/articles")
const{topicData,articleData,userData,commentData} = require('../data/development-data/index')
const format = require("pg-format")
const { convertTimestampToDate } = require("./utils")

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db.query("DROP TABLE IF EXISTS comments;")
  .then(() => {
    return db.query("DROP TABLE IF EXISTS articles;");
  })
  .then(() => {
    return db.query("DROP TABLE IF EXISTS users CASCADE;");
  })
  .then(() => {
    return db.query("DROP TABLE IF EXISTS topics CASCADE;");
  })
  .then(() => {
    return createTopic();
  }) 
  .then(()=>{
    const formattedTopic = topicData.map((topic) => {
  
      return [topic.slug,topic.description,topic.img_url]
    })

    const sqlString = format(`INSERT INTO topics(slug,description,img_url) VALUES %L RETURNING *`, 
      formattedTopic)
      return db.query(sqlString)

  })

   .then(() => {
    return createUser();
  })
  .then(()=>{
    const formattedUser = userData.map((users) => {
      
      return [users.username,users.name,users.avatar_url]
    })

    const sqlString = format(`INSERT INTO users(username,name,avatar_url) VALUES %L RETURNING *`, 
      formattedUser)
      return db.query(sqlString)

  })
  
  .then(() => {
    return createArticle();
  })
  .then(()=>{
    const formattedArticle = articleData.map((article) => {
   
      return [article.title, article.body, article.topic, article.author, article.article_img_url,article.votes, new Date(article.created_at)]
    })

    const sqlString = format(`INSERT INTO articles(title, body,topic,author,article_img_url,votes,created_at) VALUES %L RETURNING *`, 
      formattedArticle)
      return db.query(sqlString)

  })
  .then(() => {
    return createComment();
  })
  .then(()=>{return db.query(`SELECT title, article_id FROM articles `)})
  .then(({rows})=>{
   let lookupObj={}
 
  rows.forEach(({title, article_id})=>{
    lookupObj[title]=article_id

  })
  return lookupObj
  })
  .then((lookupObj)=>{
    const formattedComments =commentData.map(({ article_title, body, author, votes, created_at }) => [
      lookupObj[article_title],
      body,
      author,
      votes,
      new Date(created_at)
    ])

    const sqlString = format(`INSERT INTO comments(article_id,body,author,votes,created_at) VALUES %L RETURNING *`, 
      formattedComments)
     
      return db.query(sqlString)

  })

}

function createTopic(){
  return db.query(`CREATE TABLE topics(
    slug VARCHAR(50) PRIMARY KEY,
    description VARCHAR(100) NOT NULL,
    img_url VARCHAR(1000)
    );
  `);}
function createUser(){
  return db.query(`CREATE TABLE users(
      username VARCHAR PRIMARY KEY,
      name VARCHAR NOT NULL,
      avatar_url VARCHAR(1000)
    );`)

}
function createArticle(){
  return db.query(`CREATE TABLE articles(
      article_id SERIAL PRIMARY KEY,
      title VARCHAR NOT NULL,
      topic VARCHAR NOT NULL REFERENCES topics(slug) ON DELETE CASCADE,
      author VARCHAR  NOT NULL REFERENCES users(username) ON DELETE CASCADE,
      body TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      votes INT DEFAULT 0,
      article_img_url VARCHAR(1000) 
    );`)

}
function createComment(){
  return db.query(`CREATE TABLE comments(
      comment_id SERIAL PRIMARY KEY,
       article_id INT NOT NULL REFERENCES articles(article_id) ON DELETE CASCADE,
      body TEXT NOT NULL,
      votes INT DEFAULT 0,
       author VARCHAR NOT NULL REFERENCES users(username),
      created_at TIMESTAMP DEFAULT NOW()
    );`)


}


module.exports = seed;

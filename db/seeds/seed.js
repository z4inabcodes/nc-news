const db = require("../connection")
const{topicData,articleData,userData,commentData} = require('../data/development-data/index')
const format = require("pg-format")

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db.query("DROP TABLE IF EXISTS comments;")
  .then(() => {
    return db.query("DROP TABLE IF EXISTS article;");
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
      
      return [article.title, article.body, article.topic_slug, article.author_username, article.article_img_url]
    })

    const sqlString = format(`INSERT INTO article(title, body,topic,author,article_img_url) VALUES %L RETURNING *`, 
      formattedArticle)
      return db.query(sqlString)

  })
  .then(() => {
    return createComment();
  })
  .then(()=>{
    const formattedComments = commentData.map((comment) => {
      
      return [ comment.article_id, comment.body, comment.author_username]
    })

    const sqlString = format(`INSERT INTO comments(article_id,body,author) VALUES %L RETURNING *`, 
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
  return db.query(`CREATE TABLE article(
      article_id SERIAL PRIMARY KEY,
      title VARCHAR NOT NULL,
      topic VARCHAR REFERENCES topics(slug),
      author VARCHAR REFERENCES users(username),
      body TEXT NOT NULL,
      created_at TIMESTAMP,
      votes INT DEFAULT 0,
      article_img_url VARCHAR(1000) 
    );`)

}
function createComment(){
  return db.query(`CREATE TABLE comments(
      comment_id SERIAL PRIMARY KEY,
      article_id INT REFERENCES article(article_id),
      body TEXT NOT NULL,
      votes INT DEFAULT 0,
      author VARCHAR REFERENCES users(username),
      created_at TIMESTAMP
    );`)


}


module.exports = seed;

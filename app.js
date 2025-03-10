const db = require("./db/connection")
const express = require("express")
const app = express()
const {getEndpoint} =require('./db/controllers/getEnpoint.controllers')
// const {getTopics} =require('./db/controllers/topics.controllers')
// const {getArticlesById} =require('./db/controllers/articles.controllers')
app.get('/api', getEndpoint)
// app.get('/api/topics',getTopics)
// app.get('/api/articles/:article_id',getArticlesById)



module.exports=app
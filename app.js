const db = require("./db/connection")
const express = require("express")
const app = express()
const {getEndpoint} =require('./db/controllers/getEnpoint.controllers')
const {getTopics} =require('./db/controllers/topics.controller')
const {handleWrongEndPoints}=require('./db/controllers/errors.contollers')
const {getArticlesById} =require('./db/controllers/articles.controllers')

app.get('/api', getEndpoint)
app.get('/api/topics',getTopics)
 app.get('/api/articles/:article_id',getArticlesById)

app.all('/*', handleWrongEndPoints)
app.use((err,req,res,next)=> {
    if (err.status) {
        res.status(err.status).send({msg:err.msg });
    } else{
        res.status(500).send({ msg:'Internal Server Error'});
    }
});

module.exports=app
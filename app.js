
const express = require("express")
const app = express() 

 const db = require("./db/connection")
const {getEndpoint} =require('./db/controllers/getEnpoint.controllers')
const {getTopics} =require('./db/controllers/topics.controller')
const {handleWrongEndPoints}=require('./db/controllers/errors.contollers')
const {getArticlesById,getArticles,getCommentsByArticleId,postCommentOnArticle,patchArticleVotes} =require('./db/controllers/articles.controllers')
const {deleteComment}=require('./db/controllers/comments.controllers')

app.use(express.json())
app.get('/api', getEndpoint)
app.get('/api/topics',getTopics)
 app.get('/api/articles/:article_id',getArticlesById)
 app.get('/api/articles',getArticles)
 app.get('/api/articles/:article_id/comments',getCommentsByArticleId)
 app.post('/api/articles/:article_id/comments',postCommentOnArticle)
 app.patch('/api/articles/:article_id',patchArticleVotes)
 app.delete('/api/comments/:comment_id',deleteComment)




app.all('/*', handleWrongEndPoints)
app.use((err,req,res,next)=> {
    if (err.status) {
        res.status(err.status).send({msg:err.msg });
    } else{
        res.status(500).send({ msg:'Internal Server Error'});
    }
});

module.exports=app
const {fetchArticlesById,fetchArticles,fetchCommentByArticleID,addCommentIntoArticle,updateArticleVotes} = require('../models/articles.model')

exports.getArticlesById=(req,res,next)=>{
    fetchArticlesById(req.params.article_id).then((article)=>{
    res.status(200).send({article})
    }).catch((err)=>{
        next(err)
    })
    
}

exports.getArticles=(req,res,next)=>{
    fetchArticles().then((articles)=>{
    res.status(200).send({articles})
    }).catch((err)=>{
        next(err)
    })
    
}


exports.getCommentsByArticleId=(req,res,next)=>{

    if(isNaN(req.params.article_id)){
        return next({ status: 400, msg: "Invalid article ID!" })
    }
    fetchCommentByArticleID(req.params.article_id).then((comments)=>{
    res.status(200).send({comments:comments})
    }).catch((err)=>{
        next(err)
    })
    
}
exports.postCommentOnArticle=(req,res,next)=>{
    let article_id = req.params.article_id
    let {body,username}= req.body
    if(!username||!body){
        res.status(400).send({msg:'username and body are required!'})
    }
    
    addCommentIntoArticle(article_id,body,username).then((comment)=>{ 
    res.status(201).send({ comment})
    }).catch((err)=>{
        next(err)
    })
}
 exports.patchArticleVotes=(req,res)=>{
    const article_id = req.params.article_id
    const {inc_votes} = req.body

    if (inc_votes === undefined ||isNaN(inc_votes)){
        return res.status(400).send({msg:'Bad request'})
      }
    updateArticleVotes(article_id,inc_votes).then((article)=>{
        if (!article) {
            return res.status(404).send({ msg: 'Article not found!' });
          }
        res.status(200).send({article})
    })
    
 }
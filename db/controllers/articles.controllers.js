const {fetchArticlesById,fetchArticles,fetchCommentByArticleID} = require('../models/articles.model')

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
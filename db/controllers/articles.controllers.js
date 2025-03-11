const {fetchArticlesById,fetchArticles} = require('../models/articles.model')

exports.getArticlesById=(req,res,next)=>{
    fetchArticlesById(req.params.article_id).then((article)=>{
    res.status(200).send({article})
    }).catch((err)=>{
        next(err)
    })
    
}

exports.getArticles=(req,res,next)=>{
    fetchArticles().then((articles)=>{
        console.log(articles,' console.log(articles) in cont')
    res.status(200).send({articles})
    }).catch((err)=>{
        next(err)
    })
    
}
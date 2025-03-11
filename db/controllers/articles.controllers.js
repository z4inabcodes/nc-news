const {fetchArticlesById} = require('../models/articles.model')

exports.getArticlesById=(req,res,next)=>{
    fetchArticlesById(req.params.article_id).then((article)=>{
    res.status(200).send({article})
    }).catch((err)=>{
        next(err)
    })
    
}
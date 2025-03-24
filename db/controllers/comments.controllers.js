const db = require('../connection')
const { removeComment } = require('../models/comments.model')
exports.deleteComment=(req,res)=>{
    comment_id=req.params.comment_id
    if(!comment_id||isNaN(comment_id)){
        return Promise.reject({status:400,msg:'Inavlid Id!'})
    }
    removeComment(comment_id).then((deletedcomment)=>{
        res.status(204).send({deletedcomment})
    })
}
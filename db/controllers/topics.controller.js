const {fetchTopics} = require('../models/topics.model')

exports.getTopics=(req,res)=>{
    fetchTopics().then((topics)=>{
        res.status(200).send({topics:topics})
    })
    
}
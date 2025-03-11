const endpoints = require('../../endpoints.json')
exports.getEnpoint =(req,res)=>{
res.status(200).send({endpoints})

}
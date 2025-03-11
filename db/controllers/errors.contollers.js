exports.handleWrongEndPoints=(req,res)=>{
    res.status(404).send({msg:'Wrong Endpoint!'})

}
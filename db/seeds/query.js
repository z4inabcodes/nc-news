const db = require('../connection')

db.query(`SELECT * FROM user`).then((result)=>{
    console.log(result)
})
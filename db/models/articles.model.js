const db = require('../connection')

exports.fetchArticlesById = (article_id) => {
    return db.query('SELECT * FROM articles WHERE article_id= $1',[article_id]).then(({rows})=>{
        if (rows.length ===0){
            return Promise.reject({status:404,msg:'Article not found!'})
        }
    return rows[0]
    })
};

exports.fetchArticles=()=>{
    return db.query(`SELECT articles.author,articles.title,articles.article_id,articles.topic,articles.created_at,articles.votes,articles.article_img_url,CAST(COUNT(comments.article_id) AS INTEGER) AS comment_count FROM articles 
        LEFT JOIN comments ON articles.article_id = comments.article_id 
        GROUP BY articles.article_id
        ORDER BY articles.created_at DESC
        `).then(({rows})=>{
                 return rows

 
})}

exports.fetchCommentByArticleID = (article_id) => {
    return db
        .query(`SELECT * FROM comments WHERE article_id = $1
            ORDER BY created_at DESC`, [article_id])
        .then(({ rows }) => {
            if (rows.length ===0){
                return Promise.reject({status:404,msg:'Article not found!'})
            }
            return rows
        });
};

  
    exports.addCommentIntoArticle = (article_id, body, username) => {
       
     
                const queryString = `
                  INSERT INTO comments (article_id, body, author) 
                  VALUES ($1, $2, $3) 
                  RETURNING *;
                `;

                return db.query(queryString, [article_id, body, username])
      
              .then(({ rows }) =>{
                return rows[0];
              });
           
        }
            
        exports.updateArticleVotes = (article_id,inc_votes) => {
         
            const queryString = `
              UPDATE articles SET votes = votes + $1 WHERE article_id=$2
              RETURNING *;`;

            return db.query(queryString, [inc_votes,article_id])
  
            .then(({ rows }) =>{
             
            return rows[0];
          });
       
    }
        

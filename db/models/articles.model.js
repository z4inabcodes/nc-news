const db = require('../connection')
exports.fetchArticlesById = (article_id) => {
    return db.query('SELECT * FROM articles WHERE article_id= $1',[article_id]).then(({rows})=>{
        if (rows.length ===0){
            return Promise.reject({status:404,msg:'Invalid id!'})
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
        })

 
}


/*Responds with:

                , each of which should have the following properties:
author,title,article_id,topic,created_at,votes,article_img_url,comment_count, which is the total count of all the comments with this article_id. You should make use of queries to the database in order to achieve this.
In addition:

the articles should be sorted by date in descending order.
there should not be a body property present on any of the article objects.
 */
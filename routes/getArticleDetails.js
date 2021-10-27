var express = require('express')
var router = express.Router()
var pool = require('../sql')

// sql语句封装
// 查询文章信息，作者信息
let atcSql = `SELECT 
article.article_id,
article.article_title,
article.article_content,
article.article_htmlContent,
article.submit_date,
article.save_date,
article.user_id,
article.article_views,
article.article_likes,
user.username 
FROM article 
INNER JOIN user ON (article.user_id = user.user_id) 
WHERE article.article_id=?;
`
// 查询文章评论信息
let cmtSql = `SELECT 
comment_id,
comment_content,
fatherComment_id,
comment.user_id,
user.username,
comment_date,
comment_likes 
FROM comment 
INNER JOIN user ON (comment.user_id = user.user_id)
WHERE comment.article_id=?;
`

router.get('/', function (req, res) {
    let returnData = []
    let sqlParams = [req.query.atc_id]
    pool.getConnection((err, connection) => {
        connection.query(atcSql, sqlParams, (err, result) => {
            if (err) {
                // 执行sql语句失败
                console.log(err)
            }
            // res.send(err ? err : result)
            returnData.push(err ? err : result)
        })

        connection.query(cmtSql, sqlParams, (err, result) => {
            if (err) {
                // 执行sql语句失败
                console.log(err)
            }
            // res.send(err ? err : result)
            returnData.push(err ? err : result)
            res.send(returnData)
        })
        //释放连接
        connection.release()

    })
})

module.exports = router
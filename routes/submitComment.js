var express = require('express')
var router = express.Router()
var pool = require('../sql')

// sql语句封装
let sql = `INSERT INTO comment 
(comment_content,
fatherComment_id,
article_id,
user_id,
comment_date
) VALUES (?,?,?,?,NOW())`

router.post('/', (req, res) => {
    let sqlParams = [
        req.body.comment_content,
        req.body.fatherComment_id,
        req.body.article_id,
        req.body.user_id
    ]
    pool.getConnection((err, connection) => {
        connection.query(sql, sqlParams, (err, result) => {
            if (err) {
                // 执行sql语句失败
                console.log(err)
            }
            res.send(err ? err : result)
        })
        //释放连接
        connection.release()
    })
})

module.exports = router
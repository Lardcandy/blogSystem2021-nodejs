var express = require('express')
var router = express.Router()
var pool = require('../sql')

// sql语句封装
let sql = `SELECT 
article.*,
user.username 
FROM article 
INNER JOIN user ON (article.user_id = user.user_id) 
WHERE submit_date is not null`

router.get('/', function (req, res) {
    pool.getConnection((err, connection) => {
        connection.query(sql, (err, result) => {
            // 执行sql语句失败
            if (err) console.log(err)
            //成功执行sql语句，返回 0
            res.send(err ? err : result)
        })
        // 释放连接
        connection.release()
    })
})

module.exports = router
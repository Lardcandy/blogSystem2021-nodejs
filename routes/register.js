var express = require('express')
var router = express.Router()
var pool = require('../sql')

// sql语句封装
var sql = 'INSERT INTO user(username, password, email, register_date) VALUES(?,?,?,NOW())'
var sqlParams = null

router.post('/', function (req, res) {

    sqlParams = [req.body.username, req.body.password, req.body.email]
    // 注册账号
    pool.getConnection((err, connection) => {
        connection.query(sql, sqlParams, (err, result) => {
            // 执行sql语句失败
            if (err) {
                console.log(err)
            }
            //成功执行sql语句，返回 0
            res.send(err ? err : result)
        })
        // 释放连接
        connection.release()
    })
})

module.exports = router
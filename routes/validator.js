var express = require('express')
var router = express.Router()
var pool = require('../sql')

// sql语句封装
var sql = {
    username:'SELECT * FROM user WHERE username=?',
    email:'SELECT * FROM user WHERE email=?',
}

// 验证用户名是否存在
router.post('/username', (req, res) => {
    // 设置sql语句的参数
    var sqlParams = [req.body.username]

    pool.getConnection((err, connection) => {
        connection.query(sql.username,sqlParams,(err, result)=>{
            if (err) {
                console.log(err)
            }
            res.send(result)
        })
        // 释放连接
        connection.release()
    })
})

// 验证邮箱是否存在
router.post('/email', (req, res) => {
    // 设置sql语句的参数
    var sqlParams = [req.body.email]

    pool.getConnection((err, connection) => {
        connection.query(sql.email,sqlParams,(err, result)=>{
            if (err) {
                console.log(err)
            }
            res.send(result)
        })
        // 释放连接
        connection.release()
    })
})

module.exports = router
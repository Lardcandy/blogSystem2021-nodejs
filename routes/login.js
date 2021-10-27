var express = require('express')
var router = express.Router()
var pool = require('../sql')

// sql语句封装
var sql = 'select * from user where username=? and password=?'
var validateSql = 'select * from user where user_id=? and password=?'

// let execSql = (req, res, )

router.post('/', function(req,res){
    var sqlParams = [req.body.username,req.body.password]
    //请求来的用户名密码与数据库的数据匹配，响应结果
    pool.getConnection((err, connection) => {
        connection.query(sql, sqlParams, (err, result)=>{
            // 执行sql语句失败
            if(err){
                console.log(err)
            }
            res.send(err? err : result)
            
        })
        // 释放连接
        connection.release()
    })
})

router.post('/validateLogin', (req, res) => {
    var sqlParams = [req.body.userId,req.body.password]
    //请求来的用户名密码与数据库的数据匹配，响应结果
    pool.getConnection((err, connection) => {
        connection.query(validateSql, sqlParams, (err, result)=>{
            // 执行sql语句失败
            if(err){
                console.log(err)
            }
            res.send(err? err : result)
            
        })
        // 释放连接
        connection.release()
    })
})

module.exports = router
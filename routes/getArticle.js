var express = require('express')
var router = express.Router()
var pool = require('../sql')

// sql语句封装
let sql = {
    "submitted": 'SELECT * FROM article WHERE (submit_date is not null) and (user_id = ?)',
    "saved": 'SELECT * FROM article WHERE (save_date is not null) and (user_id = ?)'
}
// let submitSql = 'SELECT * FROM article WHERE (submit_date is not null) and (user_id = ?)'
// let saveSql = 'SELECT * FROM article WHERE (save_date is not null) and (user_id = ?)'

let execSql = (req, res, type, sqlParams) => {
    pool.getConnection((err, connection) => {
        connection.query(sql[type], sqlParams, (err, result) => {
            // 执行sql语句失败
            if (err) console.log(err)
            //成功执行sql语句，返回 0
            res.send(err ? err : result)
        })
        // 释放连接
        connection.release()
    })
} 

router.get('/', function (req, res) {
    let sqlParams = [req.query.userId]
    // 请求 已发表 的文章
    if (req.query.type === "submitted") {
        execSql(req, res, "submitted",sqlParams)
    }else if(req.query.type === "saved"){
        // 请求 草稿箱 的文章
        execSql(req, res, "saved",sqlParams)
    }else if(req.query.type === "deleted") {
        // 请求 已删除 的文章
    }
})

module.exports = router
var express = require('express')
var router = express.Router()
var pool = require('../sql')

// sql语句封装
let sql = 'UPDATE user SET description=? WHERE user_id=?'

router.post('/', function(req,res){
    let sqlParams = [req.body.description, req.body.user_id]
    pool.getConnection((err, connection) => {
        connection.query(sql, sqlParams, (err, result) =>{
            if(err){
                // 执行sql语句失败
                console.log(err)
            }
            res.send(err? err : result)
        })
        //释放连接
        connection.release()
    })
})

module.exports = router
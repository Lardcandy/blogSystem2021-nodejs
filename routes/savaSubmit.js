var express = require('express')
var router = express.Router()
var pool = require('../sql')

// sql语句封装
let saveSql = 'INSERT INTO article(article_title,article_content,article_htmlContent,save_date,user_id) VALUES(?,?,?,NOW(),?)'
let submitSql = 'INSERT INTO article(article_title,article_content,article_htmlContent,submit_date,user_id) VALUES(?,?,?,NOW(),?)'

let execSql = (req, res, sql, sqlParams) => {
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
}

router.post('/', function(req,res){
    let sqlParams = [
        req.body.atcTitle,
        req.body.atcContent,
        req.body.htmlContent,
        req.body.userId
    ]
    // 通过传来的参数operation判断是保存save  还是  发表submit
    if(req.body.operation === 'save'){
        execSql(req, res, saveSql, sqlParams)
    }else if(req.body.operation === 'submit'){
        execSql(req, res, submitSql, sqlParams)    
    }else{
        res.send('operation error')
    }
})

module.exports = router
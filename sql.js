var mysql = require('mysql')

// 连接数据库的配置
var sqlConfig = {
    host:'119.23.68.153',
    port:'3306',
    user:'jcchan',
    password:'chan9527',
    database:'blogsystem2021'    
}

// 使用连接池连接mysql
var pool = mysql.createPool(sqlConfig)

module.exports = pool
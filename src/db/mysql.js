const mysql = require('mysql')
const MYSQL_CONF = require('../config/db')

const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 统一执行sql 的函数
function exec(sql){
    const promise = new Promise((resolve,reject)=>{
        // const sql = "insert into blogs (title,content,createtime,author) values ('标题A','内容A',131231321,'zhangsan');"
        con.query(sql, (err, result)=>{
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })
    return promise
}

module.exports= exec
//  ------- controll 只关心数据怎么拿数据----------
// 获取博客列表的数据
const exec = require('../db/mysql')
const loginCheck = (username, password) => {
    let sql = `select username,realname from users where username='${username}' and password='${password}';`
    return exec(sql).then(logRes=>{
        console.log(logRes)
        return logRes[0]||{}
    })
    
}

module.exports = {
    loginCheck
}
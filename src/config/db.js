const env = process.env.NODE_ENV         // 环境参数
console.log('环境参数---------', env)
let MYSQL_CONF
if (env === 'dev') {
    MYSQL_CONF= {
        host:'localhost',
        user:'root',
        password:'123456',
        port:'3306',
        database:'myblog'
    }
}

if (env === 'production') {
    MYSQL_CONF= {
        host:'116.85.37.223',
        user:'root',
        password:'123456',
        port:'3306',
        database:'myblog'
    }
}

module.exports = MYSQL_CONF

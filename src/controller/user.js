//  ------- controll 只关心数据怎么拿数据----------
// 获取博客列表的数据
const loginCheck = (username, password) => {
    if (username === 'zhangsan'&&password === '123') {
        return true
    }
    return false
    
}

module.exports = {
    loginCheck
}
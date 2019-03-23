const {loginCheck} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = (req, res) => {
    const { method, path, body } = req
    
    // 登录接口
    if (method === 'POST' && path === '/api/user/login') {
        const { username, password } = body
        const result = loginCheck(username, password)
        console.log(result)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('登录失败')
        }
    }
    
}
module.exports = handleUserRouter
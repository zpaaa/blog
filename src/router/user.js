const {loginCheck} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = (req, res) => {
    const { method, path, body } = req
    
    // 登录接口
    if (method === 'POST' && path === '/api/user/login') {
        const { username, password } = body
        const res = loginCheck(username, password)
        // console.log(result)
        // if (result) {
        //     return new SuccessModel()
        // } else {
        //     return new ErrorModel('登录失败')
        // }
        return res.then(result=>{
            if (result.username) {
                return new SuccessModel(result)
            } else {
                return new ErrorModel('登录失败')
            }
        })
    }
}
module.exports = handleUserRouter
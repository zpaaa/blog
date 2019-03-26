const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = async (req, res) => {
    const { method, path, body } = req
    
    // 登录接口
    if (method === 'POST' && path === '/api/user/login') {
        const { username, password } = body

        // const result = login(username, password)
        // console.log(result)
        // if (result) {
        //     return new SuccessModel()
        // } else {
        //     return new ErrorModel('登录失败')
        // }

        // promise
        // const result = login(username, password)
        // return result.then(data=>{
        //     if (data.username) {
        //         // 操作cookie
        //         res.setHeader('Set-Cookie', `username=${data.username};path=/`)
        //         return new SuccessModel(data)
        //     } else {
        //         return new ErrorModel('登录失败')
        //     }
        // })
        // async await
        let data = await login(username, password)
        if (data.username) {
            // 操作cookie
            res.setHeader('Set-Cookie', `username=${data.username};path=/`)
            return new SuccessModel(data)
        } else {
            return new ErrorModel('登录失败')
        }
    }
    // 登录验证测试
    if(method === 'GET' && path === '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve( new SuccessModel() )
        } else {
            return Promise.resolve( new ErrorModel('尚未登录') )
        }
    }
}
module.exports = handleUserRouter
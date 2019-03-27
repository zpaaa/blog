const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')


// session 数据
const SESSION_DATA = {}

 // 设置cookie 时间
 const getCookieExpires = () =>{
    const d = new Date()
    d.setTime(d.getTime()+(24*60*60*1000)*1)
    console.log(d, d.toGMTString())
    return d.toGMTString()

}

// 处理postData
const getPostData = (req)=>{
    const promise = new Promise((resolve,reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !==  'application/json') {
            resolve({})
            console.log(req.headers['content-type'])
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', ()=>{
            if (!postData){
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = async (req, res) => {

    // path
    const path = req.url.split('?')[0]
    req.path = path

    // 设置返回格式
    res.setHeader('Content-type', 'application/json')

    // 解析query
    req.query = querystring.parse( req.url.split('?')[1] ) 

    // 获取cookie
    const cookieStr = req.headers.cookie || ''
    req.cookie = []
    cookieStr.split(';').forEach(item => {
        if (!item) return 
        const arr = item.split('=')
        const key = arr[0].trim()
        const value = arr[1].trim()
        req.cookie[key] = value
    })

    // 解析session
    let needSetCookie = false
    let userId = req.cookie.userid
    if(userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId]= {}
        }
    } else {
        needSetCookie = true
        userId = `${new Date()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    console.log('SESSIONDATA', SESSION_DATA)
    req.session = SESSION_DATA[userId]

    //处理postData
    let postData = await getPostData(req)
    req.body = postData

    // console.log('postData-------:',postData)
    
    //处理blog 路由
    // const blogData = handleBlogRouter(req, res)
    // if (blogData) {
    //     res.end(
    //         JSON.stringify(blogData)
    //     )
    //     return
    // }

    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
        return blogResult.then(blogData => {
            if (needSetCookie) {
                res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)        //httpOnly 只能在服务端修改cookie信息
            }
            res.end(
                JSON.stringify(blogData)
            )
            
        })
    }
    
    // 处理user 路由  
    // promise
    // const userRes = handleUserRouter(req, res)
    // if (userRes){
    //     return userRes.then(userData=>{
    //         if (userData) {
    //             res.end(
    //                 JSON.stringify(userData)
    //             )
    //             return
    //         }
    //     })
    // }

    // async await
    let userData = await handleUserRouter(req, res)
    if (userData) {
        if (needSetCookie) {
            res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)        //httpOnly 只能在服务端修改cookie信息
        }
        res.end(
            JSON.stringify(userData)
        )
        return
    }
    
    res.writeHead(404,{'Content-type': "text/plain"})
    res.write('404 NOT FOUND')
    res.end('')
}

module.exports = {
    serverHandle
}


//'dev': process.env.NODE_ENV   //监听环境是dev 还是prd
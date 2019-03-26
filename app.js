const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

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
        const key = arr[0]
        const value = arr[1]
        req.cookie[key] = value
    })

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
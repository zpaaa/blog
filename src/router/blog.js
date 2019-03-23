const {
    getList, 
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRouter = (req, res) => {
    const { method, path, query, body } = req

    // 获取博客列表
    if (method === 'GET' && path === '/api/blog/list') {
        if (!query) 
        return 
        const { author, keyword } = query
        const listData = getList(author, keyword)
        return new SuccessModel(listData)
    }

    // 这是获取博客详情的接口
    if (method === 'GET' && path === '/api/blog/detail') {
        const { id } = query
        const detailData = getDetail(id)
        return new SuccessModel(detailData)
    }

    // 这是新建博客的接口
    if (method === 'POST' && path === '/api/blog/new') {
        const data = newBlog(body)
        return new SuccessModel(data)
    }

    // 这是更新博客的接口
    if (method === 'POST' && path === '/api/blog/update') {
        const { id } = query
        const result = updateBlog(id, body)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('更新博客失败')
        }
    }
    
    // 这是删除博客的接口
    if (method === 'POST' && path === '/api/blog/del') {
        const { id } = query
        const result = delBlog(id, body)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('删除博客失败')
        }
    }
}
module.exports = handleBlogRouter
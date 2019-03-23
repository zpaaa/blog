//  ------- controll 只关心数据怎么拿数据----------
// 获取博客列表的数据
const getList = (author, keyword) => {
    //返回一个数据
    return [
            {'id':1,'title':'a','content': 'b','author': 'zpaaa','createTime':11231},
            {'id':2,'title':'c','content': 'd','author': 'gyy','createTime':11231}
        ]
}

const getDetail = (id) =>{
    return {'id':1,'title':'a','content': 'b','author': 'zpaaa','createTime':11231}
}

const newBlog = (blogData = {}) => {
    return {
        id: 3 
    }
}
const updateBlog = (id, blogData = {}) =>{
    console.log(id)
    return true
}

const delBlog = (id) =>{
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
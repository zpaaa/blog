//  ------- controll 只关心数据怎么拿数据----------
const exec = require('../db/mysql')
// 获取博客列表的数据
const getList = (author, keyword) => {
    let sql  =`select * from blogs where 1=1 `     // 1=1 的条件永远成立， 用于站位连接后面的where条件 因为author keyword 值不确定
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc; `

    // 返回一个promise
    return exec(sql)
}

const getDetail = (id) =>{
    let sql = ` select * from blogs where id='${id}';`
    return exec(sql).then(rows=>{
        return rows[0]
    })
    // return {'id':1,'title':'a','content': 'b','author': 'zpaaa','createTime':11231}
}

const newBlog = (blogData = {}) => {
    const { title, content, author } = blogData
    const createTime = Date.now()
    let sql = `insert into blogs (title, content, author, createtime) values ('${title}', '${content}', '${author}', ${createTime})`
    return exec(sql).then(insertData=>{
        // console.log(insertData)
        return {
            id: insertData.insertId
        }
    })
}
const updateBlog = (id, blogData = {}) =>{
    console.log(id)
    const { title, content } = blogData
    const createTime = Date.now()
    let sql = `update blogs set title='${title}' , content='${content}' where id=${id};`
    return exec(sql).then(updateData=>{
        // console.log(updateData)
        if (updateData.affectedRows > 0) {
            return true 
        } 
        return false
    })
}

const delBlog = (id, author) =>{
    let sql = `delete from blogs where id=${id} and author='${author}'`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true 
        }
        return false 
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
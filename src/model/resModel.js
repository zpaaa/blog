class BaseModel {
    constructor (data, message) {
        if (typeof data === 'string') {
            // 如果1第一个传的是字符串，说明只传了一个字符串
            // message 就是那个字符串
            this.message = data;
            // 把传过来的值清空
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

class SuccessModel extends BaseModel {
    constructor (data, message) {
        super(data, message)
        this.errcode = 0 
    }
}

class ErrorModel extends BaseModel {
    constructor (data, message) {
        super(data, message)
        this.errcode = 1 
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}
const http = require('http')
const { serverHandle } = require('../app')

const PORT = 9527

const server = http.createServer(serverHandle)

server.listen(PORT, () => {
    console.log(PORT)
})
const http = require('http')

http.createServer((req, res) => {
    console.log('req come:', req.url)
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Test-Cors', // 允许请求头
        'Access-Control-Allow-Methods': 'POST, PUT, DELETE', // 允许请求方法
        'Access-Control-Max-Age': '1000' // 单位秒， 允许跨域请求的，验证通过后，1000s内不需要再发options请求验证
    })
    res.end('node http server')
}).listen(8887)

console.log('server listening on 8887')
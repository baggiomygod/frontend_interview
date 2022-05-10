const http = require('http')
const fs = require('fs')
http.createServer((req, res) => {
    console.log('req come:', req.url)
    if (req.url === '/') {
        const html = fs.readFileSync('test.html', 'utf-8')
        res.writeHead(200, {
            'Content-Type': 'text/html',
            // 服务端写入cookie, max-age: 多久过期；expires： 到什么时间点过期
            'Set-cookie': ['id=123;max-age=2;domain=test.com', 's_id=321;HttpOnly']
        })
        res.end(html)
    }

    if (req.url === '/script.js') {
        res.writeHead(200, {
            'Content-Type': 'text/javascript',
            // cache-contorl: 浏览器可以缓存
            // no-cache: 浏览器访问缓存前需要经验证后才可使用
            // no-store: 无缓存
            'Cache-Control': 'max-age=10000, no-cache',
            'Last-Modified': '123',
            'Etag': '777'
        })

        const etag = req.headers['if-non-match']
        if (etag === '777') {
            res.writeHead(304, {
                'Content-Type': 'text/javascript',
                'Cache-Control': 'max-age=10000, no-cache',
                'Last-Modified': '123', // 
                'Etag': '777'
            })
            res.end('')
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/javascript',
                'Cache-Control': 'max-age=10000, no-cache',
                'Last-Modified': '123',
                'Etag': '777'
            })
        }
        res.end('console.log("script loaded 1")')
    }
}).listen(8888)

console.log('server listening on 8888')
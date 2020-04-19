const CACHE_NAME = 'cache-v1'
// 安装 sw脚本被安装后触发
self.addEventListener('install', (e) => {
    console.log('install1:', e)
    // e.waitUntil(new Promise(resolve => {
    //     setTimeout(resolve, 5000)
    // }))
    // 强制定制旧的sw,并激活新的sw
    e.waitUntil(self.skipWaiting())

    // 设置缓存空间
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                // 写入到缓存
                cache.addAll([
                    '/',
                    './index.css'
                ])
            }))
})

// 激活 
self.addEventListener('activate', (e) => {
    console.log('activate:', e)
    // 使页面首次加载后受到sw的控制
    // sw控制所有页面
    // e.waitUntil(self.ClientRectList.claim())

    // sw版本发生变化，清理缓存
    e.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
                console.log('clear', cacheName, CACHE_NAME)
                return caches.delete(cacheNames)
            }
        }))
    }))
})

// fetch捕获 资源请求时触发
// 去cache中查询，存在则使用缓存，否则通过网络请求获取
self.addEventListener('fetch', (e) => {
    console.log('fetch:', e)

    e.respondWith(
        caches.open(CACHE_NAME)
        .then(
            cache => {
                return cache.match(e.request).then(res => {
                    if (res) {
                        return res
                    }
                    return fetch(e.request).then(res => {
                        // 请求到数据之后放入缓存，key: value
                        cache.put(e.request, res.clone())
                        return res
                    })
                })
            }
        ))
})
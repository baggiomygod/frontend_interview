# windows nginx

https://www.cnblogs.com/xiangzhong/p/11355252.html

= 严格匹配。如果这个查询匹配，那么将停止搜索并立即处理此请求。

~ 为区分大小写匹配(可用正则表达式)

!~为区分大小写不匹配

~* 为不区分大小写匹配(可用正则表达式)

!~*为不区分大小写不匹配

^~ 如果把这个前缀用于一个常规字符串,那么告诉nginx 如果路径匹配那么不测试正则表达式。

## windows kill所有nginx

```
taskkill /f /t /im nginx.exe
```

## windows 查看端口 kill

```
    netstat -ano|findstr 8080
    taskkill  -F -PID 8080
```

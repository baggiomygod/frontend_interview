# nginx负载均衡配置

```
    upstream Webpages {
          server host1:8081;
          server host2:8082;
      }
  
      server {
          listen       8080;
          server_name  localhost;
          location / {
             proxy_pass http://Webpages;
         }
     }
```

## 后端项目配置负载均衡

后端项目(Asp.Net Core WebApi) 不能直接使用Nginx作为Web服务器，需要先使用IIS、Kestrel部署多个实例，或者把项目部署成服务，然后才能使用Nginx配置负载均衡。

3-1. 假设我们已经使用IIS部署了三个Web API，分别为:localhost:8087，localhost:8088，localhost:8089。和上面类似的，只需在配置文件中相应增加upstream节点和Server节点即可

```
upstream WebApi {
        server localhost:8087;
        server localhost:8088;
        server localhost:8089;
    }

    server {
        listen       8090;
        server_name  localhost;

        location / {
            proxy_pass http://WebApi;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```

https://blog.csdn.net/xiaohanshasha/article/details/81870453
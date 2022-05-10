
## dj连接mysql数据库报错
django.db.utils.OperationalError: (2059, ＜NULL>)
```
'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'fui_store',
        'USER': 'root',
        'PASSWORD': 'rbaggio10!',
        # 这里不要加'mysql://' 否则会报错 django.db.utils.OperationalError: (2059, ＜NULL>),
        # 网上有说是mysql密码加密方式问题，改了时候还是一样，后来去掉mysql:// 就好了
        'HOST': 'rm-bp1kqfk1r947048v79o.mysql.rds.aliyuncs.com',
        'PORT': '3306',
    }
```
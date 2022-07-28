# 前后端分离-rest——framework_simpleje插件使用

1. 后端配置

setting.py

```
INSTALLED_APPS = [
    # ...
    'rest_framework',  # restful api
    'rest_framework.authtoken',
]
REST_FRAMEWORK = {
    # 访问权限
    'DEFAULT_PERMISSION_CLASSES': (
        # 'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly',
        'rest_framework.permissions.IsAuthenticated',  # 普通用户
        # 'rest_framework.permissions.AllowAny', #所有用户
        # 'rest_framework.permissions.IsAdminUser',  # 管理员户
    ),
    # 身份认证的方式：jwt,session两种
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # 前后端分离使用jwt验证
        # 'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        # 访问admin后台时使用
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}

# 与drf的jwt相关的设置
SIMPLE_JWT = {
    # token有效时长
    'ACCESS_TOKEN_LIFETIME': datetime.timedelta(minutes=30),
    # token刷新后的有效时间
    'REFRESH_TOKEN_LIFETIME': datetime.timedelta(days=1)
}
```


2. urls配置

```
from rest_framework.authtoken import views

from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView, TokenVerifyView)

urlpatterns = [
    # rest_framework 测试登录
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # drf自带的token授权登录，获取token需要向该地址post数据
    path('api-token-auth/', views.obtain_auth_token),

    # rest_framework_simplejwt的token认证
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # 验证Token的有效性
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]

```


3. 前端请求
登录获取token
Login
```
   const res: any = await djLogin({
        username: 'admin',
        password: '123456',
      })
      Cookies.set('token', res.access)

```

HEADER头中带上`Authorization： Bearer {token}`
```
  config.headers['Authorization'] = 'Bearer '  + Cookies.get('token') || ''
```



# 参考
> https://pythondjango.cn/django/rest-framework/7-jwt-token-authentication/
> https://www.cnblogs.com/lczmx/p/15668391.html
> https://blog.csdn.net/qq_33398946/article/details/109974998
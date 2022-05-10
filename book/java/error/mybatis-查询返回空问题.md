# mybatis selectList sql语句问题

```
 GET "/v1/book", parameters={}
2022-01-20 10:38:00.105 DEBUG 33000 --- [nio-8088-exec-1] c.f.f.mapper.BookMapper.selectList       : ==>  Preparing: SELECT id,title,author,summary,image,create_time,update_time,delete_time FROM book WHERE delete_time=0
2022-01-20 10:38:00.117 DEBUG 33000 --- [nio-8088-exec-1] c.f.f.mapper.BookMapper.selectList       : ==> Parameters: 
2022-01-20 10:38:00.134 DEBUG 33000 --- [nio-8088-exec-1] c.f.f.mapper.BookMapper.selectList       : <==      Total: 0
```

正确的：  delete_time IS NULL
```
GET "/v1/book", parameters={}
2022-01-20 10:37:38.370 DEBUG 34968 --- [io-5000-exec-10] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped to io.github.talelin.latticy.controller.v1.BookController#getBooks()
2022-01-20 10:37:38.384 DEBUG 34968 --- [io-5000-exec-10] i.g.t.l.mapper.BookMapper.selectList     : ==>  Preparing: SELECT id,title,author,summary,image,create_time,update_time,delete_time FROM book WHERE delete_time IS NULL
2022-01-20 10:37:38.385 DEBUG 34968 --- [io-5000-exec-10] i.g.t.l.mapper.BookMapper.selectList     : ==> Parameters: 
2022-01-20 10:37:38.396 DEBUG 34968 --- [io-5000-exec-10] i.g.t.l.mapper.BookMapper.selectList     : <==      Total: 2
```

#### 解决一
不用@TableLogic注解，

#### 解决二
配置application.yml
```
mybatis-plus:
  configuration:
    # 开启下划线转驼峰
    map-underscore-to-camel-case: true
    # 指定默认枚举类型的类型转换器
    default-enum-type-handler: com.baomidou.mybatisplus.core.handlers.MybatisEnumTypeHandler
  global-config:
    # 开启/关闭 banner 打印
    banner: true
    db-config:
      # 逻辑删除（软删除）
      logic-delete-value: NOW()
      logic-not-delete-value: 'NULL'
  # mapper路径位置
  mapper-locations: classpath:mapper/*.xml
```
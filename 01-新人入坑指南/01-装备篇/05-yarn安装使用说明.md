## yarn安装使用说明

yarn用来取代npm管理依赖

### 安装
官网：https://yarnpkg.com/zh-Hans/

第三方：https://yarn.bootcss.com/

### 常用命令

#### 设置淘宝镜像
不设置也很快
```
yarn config set registry https://registry.npm.taobao.org
```

#### 安装现有依赖
```
yarn
```

#### 安装一个依赖到dependencies
```
yarn add 包名
```

#### 安装一个依赖到devDependencies
```
yarn add 包名 -D
```

#### 全局安装一个插件
```
yarn global add hexo
```

#### 初始化一个新项目

```
yarn init
```

#### 升级一个依赖
```
yarn upgrade element-ui
```
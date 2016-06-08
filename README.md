前端集成解决方案
======

* 所有静态资源自动加 ``md5版本戳``
* 支持给所有静态资源添加域名前缀
* JS 文件的分析、合并、压缩、版本管理
* CSS 文件的分析、合并、压缩、版本管理
* HTML 文件分析、压缩、版本管理
* 入口模块的分析、分块构建、增量构建、合并、压缩、版本管理
* 静态资源的分析、压缩、版本管理
* png图片压缩，支持 ``将png24压缩为png8``
* 内置本地开发调试服务器，支持运行 ``jsp``、``php``
* 支持使用 ``less``、``es6`` 开发项目
* 支持文件监听，保存即发布
* 支持浏览器自动刷新，保存即刷新
* 可以上传到远端服务器，保存即增量编译上传
* 开发环境使用 cmd 规范
* 支持分块加载和异步加载
* 良好的构建工具配套支持

详细用法
=========

## 安装

```bash
npm install -g stbui
```

安装成功后执行 ``stbui -h`` 即可看到相关开发命令帮助


## 获得一个todo样例项目

```bash
stbui project demo
```

## 让代码跑起来！

首先，启动内置的调试服务器：

```bash
stbui server start
```

```bash
stbui release
```


## 目录规范

业务目录
page
    index
    login
    user

组件目录
widget
    tab
    list



## 配置文件

默认配置文件为 stbui-conf.js，stbui 编译的整个流程都是通过配置来控制的。


## stbui 命令

```bash
stbui release
stbui server
```

## stbui 命令简化
```bash
npm run start
npm run bulid
npm run prd
```

## webpack
start
```bash
webpack-dev-server --devtool eval --progress --colors --hot --content-base build
```
dev
```bash
webpack --progress --colors --watch
```

watch
```bash
webpack-dev-server --hot --progress --colors
```
prd
```bash
NODE_ENV=production webpack --progress --colors
```

## fis
start
```bash
stbui server start -p 1111 --www ./dist
```
dev
``bash
stbui release dev -d ./dist
```

watch
```bash
stbui release dev -d ./dist -w -l
```

prd
```bash
stbui release prd -d ./dist
```


如果使用中遇到什么觉得诡异的地方，欢迎拨打热线电话10086

参考链接
https://coolie.ydr.me/introduction/coolie/
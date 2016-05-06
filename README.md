前端集成解决方案
======

* 以 ``seajs`` 作为模块化框架
* 所有静态资源自动加 ``md5版本戳``，seajs均可加载定位
* 支持给所有静态资源添加域名前缀，seajs加载毫无压力
* 非常易用的自动 ``csssprites``
* 自动jshint校验js、coffee文件，校验结果为 ``中文`` 显示
* js、css压缩，压缩时保留require关键字，使得seajs运行正常
* png图片压缩，支持 ``将png24压缩为png8``
* 内置本地开发调试服务器，支持运行 ``jsp``、``php``
* 支持使用 ``less``、``es6`` 开发项目
* 支持将underscore模板编译成 ``js模板函数`` 直接嵌入到js或es6文件中使用
* 支持define自动包装，写seajs组件如同写nodejs一样舒爽
* 支持文件监听，保存即发布
* 支持浏览器自动刷新，保存即刷新
* 可以上传到远端服务器，保存即增量编译上传
* 超低学习成本，只须记忆 ``3`` 条命令即可完成开发

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
npm run dev
npm run prd
```


如果使用中遇到什么觉得诡异的地方，欢迎拨打热线电话10086
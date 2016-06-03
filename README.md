前端集成解决方案
=========

* 集成 ``webpack`` 和 ``fis``构建而且内置配置文件，通过 ``stbui`` 命令快速构建整个项目。


详细用法
=========

## 安装环境

使用 stbui 前，请确保系统已经安装了nodejs。

## 安装 stbui

```bash
npm install -g stbui
```

安装成功后执行 ``stbui -h`` 即可看到相关开发命令帮助


## 创建项目

```bash
stbui project demo
```

## 调试

在项目目录执行

```bash
npm run start
```

然后，在浏览器中打开http://127.0.0.1:1111即可看到页面

## 构建

```bash
npm run bulid
```

然后，在dist目录是构建之后的文件


## 配置文件

默认配置文件为 stbui-conf.js，stbui 编译的整个流程都是通过配置来控制的。

对于一些有自定义需求的项目，要是希望进一步做一些配置，自行配置

## stbui 命令

```bash
stbui
stbui release
stbui server
```


如果使用中遇到什么觉得诡异的地方，欢迎拨打热线电话10086



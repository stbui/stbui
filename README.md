前端集成解决方案
=============
- JS 文件的分析、合并、压缩、版本管理
- CSS 文件的分析、合并、压缩、版本管理
- HTML 文件分析、压缩、版本管理
- 入口模块的分析、分块构建、增量构建、合并、压缩、版本管理
- 静态资源的分析、压缩、版本管理
- 兼容 ie6 - ie11/chrome/firefox，以及各种手机浏览器
- 支持分块加载和异步加载
- 良好的构建工具配套支持


# 详细用法


## 安装 stbui

通过下面的命名即可安装 stbui
```bash
npm install -g stbui --verbose
```
如果安装很慢的话，可以尝试使用taobao的源进行安装。具体如下：
```bash
npm install -g stbui --registry=https://registry.npm.taobao.org --verbose
```
安装完成后，可以通过 `stbui -v` 命名查看安装的版本


## 使用命令创建项目

stbui 安装完成后，就可以通过下面的命令创建项目：
```bash
stbui project demo
```
注：demo为项目存放的目录


## 构建项目
```bash
stbui release dev -wL
```
项目中有文件修改就会自动构建了。

如果要查看构建后的代码执行命令：
```bash
stbui server open
```


## 启动项目服务

在项目目录下执行命令

```bash
stbui server start
```

## 访问项目
打开浏览器，访问http://127.0.0.1:8080即可


## stbui 命令
你可以通过 `stbui -h` 帮助查看相关命令

```bash
stbui release
stbui server
stubi project <name>
stbui framework <name>
stbui page <name>
```

## stbui 命令简化
```bash
npm run start
npm run dev
npm run bulid
```

## 配置文件

默认配置文件为 `stbui-conf.js`，stbui 编译的整个流程都是通过配置来控制的。


如果使用中遇到什么觉得诡异的地方，欢迎拨打热线电话10086

- https://github.com/fex-team/fis-parser-jdists
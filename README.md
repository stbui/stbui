前端集成解决方案
=============
> Stbui，一套为开发者准备的前端集成库，提供了配套资源，帮助你的网站快速成型。

- [x] 生成项目、模块、页面、组件文件结构
- [x] JS 文件的分析、合并、压缩、版本管理
- [x] CSS 文件的分析、合并、压缩、版本管理
- [x] HTML 文件分析、压缩、版本管理
- [x] 入口模块的分析、分块构建、增量构建、合并、压缩、版本管理
- [x] 静态资源的分析、压缩、版本管理
- [x] 图片压缩
- [x] 文件MD5戳
- [x] 本地预览
- [x] 兼容 ie6 - ie11/chrome/firefox，以及各种手机浏览器
- [x] 支持分块加载和异步加载
- [x] 良好的构建工具配套支持


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
安装完成后，可以通过 `stbui -v` 命令查看安装的版本


## 创建项目

stbui 安装完成后，就可以通过下面的命令创建项目：
```bash
stbui project demo
```
注：demo为项目存放的目录


## 构建项目
```bash
stbui release dev -w
```
项目中有文件修改就会自动构建了。

如果要查看构建后的代码执行命令：
```bash
stbui server open
```


## 启动服务

在项目目录下执行命令

```bash
stbui server start
```

## 访问项目
打开浏览器，访问:

```bash
http://127.0.0.1:8080
```


## 项目结构
```
├── dist
│   └── xxx.zip
│
├── framework
│   ├── common
│       ├── images
│       ├── stbui.less
│       └── index.js
│
├── page
│   ├── page
│       ├── images
│       ├── index.less
│       ├── index.js
│       └── index.html
│
├── package.json
├── map.json
└── stbui-conf.js
```



## stbui 命令
你可以通过 `stbui -h` 帮助查看相关命令

```bash
stbui release <name>    # 构建代码
stbui server <name>     # 本地服务
stubi project <name>    # 创建项目
stbui framework <name>  # 添加公共模块
stbui page <name>       # 添加业务模块
stbui-ide               # 可视化工具，需要单独安装
```

## npm scripts
你也可以使用下面方式
```bash
npm run start   # 启动开发环境
npm run dev     # 构建开发代码
npm run bulid   # 打包产线代码
npm run ide     # 可视化工具
```

## 配置文件

默认配置文件为 `stbui-conf.js`，stbui 编译的整个流程都是通过配置来控制的。


如果使用中遇到什么觉得诡异的地方，欢迎拨打热线电话10086

## ChangeLog

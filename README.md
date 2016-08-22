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

## 安装

```bash
npm install -g stbui
```

安装成功后执行 `stbui -h` 即可看到相关开发命令帮助


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

## 配置文件

默认配置文件为 stbui-conf.js，stbui 编译的整个流程都是通过配置来控制的。


## stbui 命令
你可以通过`stbui -h`帮助查看相关命令

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


如果使用中遇到什么觉得诡异的地方，欢迎拨打热线电话10086

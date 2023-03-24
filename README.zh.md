# fool-deploy

[English](./README.zh.md)

在 linux 服务器中快速部署你的 web 项目。你或许不知道`docker`,`nginx`.别担心，你只需要像是运行`npm run deploy`命令一样，它会帮你完成剩下的一切。

# 前置条件

1. 一台 linux 服务器.
2. 在你的服务器上[安装 docker 引擎](https://docs.docker.com/engine/install/centos/).

就是如此简单。

# 怎样使用

1. 安装依赖

```shell
$ npm i fool-deploy
```

2. 编辑你的 package.json, 添加以下命令:

```shell
"scripts": {
  "deploy":"fool-deploy"
}
```

3. 在你的项目根目录运行以下命令:

```shell
$ npm run deploy
```

# 配置

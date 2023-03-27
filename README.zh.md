# fool-deploy

[English](./README.md)

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
  "deploy":"fool"
}
```

3. 在你的项目根目录运行以下命令:

```shell
$ npm run deploy
```

# 配置

如果你想要自定义配置, 你需要在项目根目录下创建 `fool-deploy.json` 文件.

```json
{
  "cache": true,
  "port": 2333,
  "packageCommand": "pnpm",
  "nodeVersion": "18.14-alpine",
  "nginxVersion": "1.22.1",
  "imageName": "fool-deploy:prod"
}
```

|      字段      |           类型           |           描述           |      默认值      |
| :------------: | :----------------------: | :----------------------: | :--------------: |
|     cache      |         boolean          |       是否使用缓存       |       true       |
|      port      |          number          |      项目运行端口号      |       2333       |
| packageCommand | `yar` or `npm` or `pnpm` | 当前项目所使用的包管理器 |       pnpm       |
|  nodeVersion   |          string          | docker 镜像的 node 版本  |   18.14-alpine   |
|  nginxVersion  |          string          | docker 镜像的 nginx 版本 |      1.22.1      |
|   imageName    |          string          |    docker 镜像的名称     | fool-deploy:prod |

# 证书

[MIT](./LICENSE)

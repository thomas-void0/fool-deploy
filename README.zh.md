# fool-deploy

[![Test](https://github.com/thomas-void0/fool-deploy/actions/workflows/test.yml/badge.svg)](https://github.com/thomas-void0/fool-deploy/actions/workflows/test.yml)
[![Publish](https://github.com/thomas-void0/fool-deploy/actions/workflows/publish.yml/badge.svg)](https://github.com/thomas-void0/fool-deploy/actions/workflows/publish.yml) <img src="https://img.shields.io/npm/v/fool-deploy.svg" alt="npm package">

[English](https://github.com/thomas-void0/fool-deploy#readme)

你可以通过`fool-deploy`在服务器上快速且简单的部署你的博客，demo，前端页面等等。

# 示范

部署由 `vite` 和 `create-react-app` 创建的应用:

![image](https://user-images.githubusercontent.com/48620706/227898197-5314717d-5184-4d64-b7c9-d6f0bfe9b8d2.png)
![image](https://user-images.githubusercontent.com/48620706/227898276-aeea45d6-9d6b-40f4-90cc-aa48b73ba420.png)

# 前置条件

1. 一台 linux 服务器。
2. 在你的服务器上[安装 docker 引擎](https://docs.docker.com/engine/install/centos/)。(注意：根据您的服务器操作系统类型选择安装类型)。
3. 通过`git`或者[XFTP](https://www.xshell.com/en/xftp/)或者`linux rz`命令将你的项目源代码拉取或者拷贝到服务器上。这里更推荐你使用`git`去完成此操作，这样更有利于你同步更新。
4. 在你的服务器上安装`node`和`npm`。

# 怎样使用

1. 安装依赖

```shell
$ npm i fool-deploy

或者

$ yarn add fool-deploy

或者

$ pnpm i fool-deploy
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

或者

$ yarn deploy

或者

$ pnpm deploy
```

# 配置

如果你想要自定义配置, 你需要在项目根目录下创建 `.foolrc` 文件.

```json
{
  "cache": true,
  "port": 2333,
  "packageCommand": "pnpm",
  "nodeVersion": "18.14-alpine",
  "nginxVersion": "1.22.1",
  "imageName": "fool-deploy:prod",
  "output": "dist"
}
```

## cache

`cache`:表示是否使用缓存，默认为`true`。如果设置`true`，将在第一次构建后，在项目的根目录生成`.fool-cache`目录。以后的每一次构建，在`.foolrc`配置不变的情况下，会直接运行`.fool-cache`中的配置文件。

## port

`port`:表示项目部署后运行的端口号，默认为`2333`。如果端口号被占用，会自动`+1`,直到找到一个可用的端口号为止。

## packageCommand

`packageCommand`:表示项目安装依赖和打包所使用的包管理器,默认会读取你执行部署命令所使用的包管理器,比如你执行`yarn deploy`，那么该选项会被指定为`yarn`。可配置的选项有：`npm` | `yarn` | `pnpm`。此选项非常重要，假设项目打包所使用的`npm`管理器，但是在部署时指定为`yarn`运行。可能会导致部署过程中安装依赖或者执行构建失败。

## nodeVersion

`nodeVersion`:表示部署的项目安装依赖和打包所需的`node`环境版本，默认为`18.14-alpine`。当此版本不满足项目打包需求时，请选择可运行的版本。更多版本信息可通过[dockerhub node](https://hub.docker.com/_/node)获取。

## nginxVersion

`nginxVersion`:表示部署的项目需要运行的`nginx`环境版本，默认为`1.22.1`。当此版本不满足需求时，请选择可运行的版本。更多版本信息可通过[dockerhub nginx](https://hub.docker.com/_/nginx)获取。

## imageName

`imageName`:表示 docker 构建的镜像名，默认会读取`package.json`中的`name`字段。最后构成的格式为`name:prod`。

## output

`output`:表示项目打包的产物输出目录，等同于`webpack`指定的输出目录。默认为`dist`。如果你的项目中输出目录为`build`，请务必在`.foolrc`中指定。否则会导致找不到产物报错。

# 证书

[MIT](./LICENSE)

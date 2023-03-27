# fool-deploy

<img src="https://img.shields.io/npm/v/fool-deploy.svg" alt="npm package">

[![Test](https://github.com/thomas-void0/fool-deploy/actions/workflows/test.yml/badge.svg)](https://github.com/thomas-void0/fool-deploy/actions/workflows/test.yml)
[![Publish](https://github.com/thomas-void0/fool-deploy/actions/workflows/publish.yml/badge.svg)](https://github.com/thomas-void0/fool-deploy/actions/workflows/publish.yml)

[简体中文](./README.zh.md)

a fast deploy your web project in linux server. you maybe not know `docker`, `nginx`. don't worry, you just need to use something like `npm run deploy` command.it's can help you complete all.

# Precondition

1. a linux server.
2. in your server [install docker engine](https://docs.docker.com/engine/install/centos/).

Just so simple.

# How use

1. install deps

```shell
$ npm i fool-deploy
```

2. modify your package.json, add the following command:

```shell
"scripts": {
  "deploy":"fool"
}
```

3. in your web project root dir run:

```shell
$ npm run deploy
```

# Configuration

if you want custom config, you need create `.foolrc` in project root dir.

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

|                     field                      |           type           |             description              |         defult         |
| :--------------------------------------------: | :----------------------: | :----------------------------------: | :--------------------: |
|                     cache                      |         boolean          |              use cache               |          true          |
|                      port                      |          number          |   port number for project running    |          2333          |
|                 packageCommand                 | `yar` or `npm` or `pnpm` | package manager for current project  |     running input      |
|  [nodeVersion](https://hub.docker.com/_/node)  |          string          |     node version of docker image     |      18.14-alpine      |
| [nginxVersion](https://hub.docker.com/_/nginx) |          string          |    nginx version of docker image     |         1.22.1         |
|                   imageName                    |          string          |         name of docker image         | your package.json name |
|                     output                     |          string          | build output folder for your project |          dist          |

# License

[MIT](./LICENSE)

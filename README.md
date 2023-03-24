# fool-deploy

[简体中文](./README.zh.md)

a fast deploy your web project in linux server. you maybe not know `docker`, `nginx`. don't worry, you just need to use something like `npm run deploy` command.it's can help you complete all.

# precondition

1. a linux server.
2. in your server [install docker engine](https://docs.docker.com/engine/install/centos/).

Just so simple.

# how use

1. install deps

```shell
$ npm i fool-deploy
```

2. modify your package.json, add the following command:

```shell
"scripts": {
  "deploy":"fool-deploy"
}
```

3. in your web project root dir run:

```shell
$ npm run deploy
```

# configuration

# fool-deploy

[![Test](https://github.com/thomas-void0/fool-deploy/actions/workflows/test.yml/badge.svg)](https://github.com/thomas-void0/fool-deploy/actions/workflows/test.yml)
[![Publish](https://github.com/thomas-void0/fool-deploy/actions/workflows/publish.yml/badge.svg)](https://github.com/thomas-void0/fool-deploy/actions/workflows/publish.yml) <img src="https://img.shields.io/npm/v/fool-deploy.svg" alt="npm package">

[简体中文](./README.zh.md)

You can use `fool-deploy` to quickly and easily deploy your blogs, demos, frontend pages, and more on the server.

# demo

Deploy the application created by `vite` and `create-react-app`:

![image](https://user-images.githubusercontent.com/48620706/227898197-5314717d-5184-4d64-b7c9-d6f0bfe9b8d2.png)
![image](https://user-images.githubusercontent.com/48620706/227898276-aeea45d6-9d6b-40f4-90cc-aa48b73ba420.png)

# Precondition

1. a linux server.
2. in your server [install docker engine](https://docs.docker.com/engine/install/centos/).（notes:Choose the type of installation for your server os type）
3. Through `git` or [XFTP](https://www.xshell.com/en/xftp/) or `Linux rz` command will your project source code pull or copied to the server
4. Install `node` and `npm` on your server.

# How use

1. install deps

```shell
$ npm i fool-deploy

or

$ yarn add fool-deploy

or

$ pnpm i fool-deploy
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

or

$ yarn deploy

or

$ pnpm deploy
```

# Configuration

if you want custom config, you need create `.foolrc` in project root dir.

```json
{
  "cache": true,
  "port": 2333,
  "packageCommand": "npm",
  "buildCommand": "npm run build",
  "nodeVersion": "18.14-alpine",
  "nginxVersion": "1.22.1",
  "imageName": "fool-deploy:prod",
  "output": "dist"
}
```

## cache

`cache`:Indicates whether to use caching; defaults to `true`。If you set`true`，The `.fool-cache` directory will be generated at the root of the project after the first build.Each subsequent build will run the configuration file in `.foolrc` with the same `.foolrc` configuration.
Using caching can shorten the time it takes to deploy your project later.

## port

`port`:Indicates the port on which the project will run after deployment; defaults to `2333`。If the port number is occupied, it will automatically `+1` until an available port number is found.

## packageCommand

`packageCommand`:Indicates the package manager used to install dependencies and build the project. By default, this will read the package manager you used to execute the deployment command.
for example you running `yarn deploy`，the option is specified as `yarn`。The configurable options are `npm` | `yarn` | `pnpm`。This option is very important，
Suppose the `npm` manager used by the project is packaged, but specified to run as `yarn` at deployment time. This could cause dependencies to fail to install or build during deployment.

## buildCommand

`buildCommand`:Indicates the project build command，defaults to specified `packageCommand` field `[packageCommand] build`.

## nodeVersion

`nodeVersion`:Indicates the version of the `node` environment required to install dependencies and packages for the deployed project.Default is `18.14-alpine`。
When this version does not meet the project packaging needs, choose a runnable version. More version information can be found at [dockerhub node](https://hub.docker.com/_/node).

## nginxVersion

`nginxVersion`:Indicates the version of `nginx` environment to run for the deployed project.Default is `1.22.1`。When this version does not meet the project packaging needs, choose a runnable version. More version information can be found at [dockerhub nginx](https://hub.docker.com/_/nginx).

## imageName

`imageName`:Indicates the name of the image that `docker` is building, and by default it reads the `name` field in `package.json`.the format is `name:prod`。

## output

`output`:Indicates the bundled output directory of the project, equivalent to the output directory specified by `webpack`. The default is `dist`。If the output directory in your project is `build`，You must specify it in `.foolrc`. Otherwise, it will cause an error that the resouce cannot be found.

# License

[MIT](./LICENSE)

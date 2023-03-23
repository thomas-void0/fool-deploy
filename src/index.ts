// import path from 'path';
import fs from 'fs';
import cpypto from 'crypto';

cpypto;

let options: Record<string, any> = {
  cache: true,
  port: '2333',
  buildCommand: 'pnpm build',
  installCommand: 'pnpm install',
  nodeVersion: '18.14-alpine',
  nginxVersion: '1.22.1',
};

// 处理配置
function collectOptions() {
  const cwdPath = process.cwd();
  // read package.json for get name and version
  const pkgPath = `${cwdPath}/package.json`;
  if (fs.existsSync(pkgPath)) {
    const str = fs.readFileSync(pkgPath).toString('utf-8');
    const { name = 'foolDeploy', version = 'prod' } = JSON.parse(str);
    options.tagName = `${name}:${version}`;
  } else {
    throw new Error(
      `Error: ${cwdPath} not found package.json，shell must running in projcet root dir.`
    );
  }

  // read foolDeploy.json config
  const jsonPath = `${cwdPath}/foolDeploy.json`;
  if (fs.existsSync(jsonPath)) {
    const str = fs.readFileSync(jsonPath).toString('utf-8');
    const externalOptions = JSON.parse(str);
    options = { ...options, ...externalOptions };
  }
}

function generateDockerfile(options: any) {
  `
  ARG NAME=node
  ARG VERSION=${options.nodeVersion}
  ARG PROXY=nginx
  ARG PROXY_VERSION=1.22.1

  FROM node:${options.nodeVersion} as deps
  WORKDIR /workspace
  RUN npm install -g pnpm
  COPY pnpm-lock.yaml .npmrc ./
  RUN pnpm fetch
  COPY package.json ./
  RUN pnpm install --frozen-lockfile --offline --ignore-scripts

  FROM node:${options.nodeVersion} as builder
  WORKDIR /workspace
  RUN npm install -g pnpm
  COPY --from=deps /workspace/node_modules ./node_modules
  COPY . .
  RUN pnpm build

  FROM nginx:${options.nginxVersion} as runer
  WORKDIR /
  COPY --from=builder /workspace/dist/ /usr/share/nginx/html/
  RUN rm /etc/nginx/conf.d/default.conf
  COPY --from=builder /workspace/nginx.conf /etc/nginx/conf.d/
  `;
}

function generateDeployShell() {}

// exec run
function run() {}

// read .fool-cache cache
function readCache() {}

// decide whether use cache
function isUseCache() {
  if (options.cache) {
  }
}

function init() {
  collectOptions();
  generateDockerfile(options);
  generateDeployShell();
  run();
}

init();

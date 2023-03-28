import { Options } from '../typings';
import fs from 'fs';

function checkExist(filename: string) {
  return fs.existsSync(filename);
}

function generateDockerfileContent(
  options: Pick<
    Options,
    | 'nodeVersion'
    | 'nginxVersion'
    | 'packageCommand'
    | 'output'
    | 'buildCommand'
  >,
  dirPath: string
) {
  const { nodeVersion, nginxVersion, packageCommand, output, buildCommand } =
    options;

  let deps = '';
  let builder = '';

  if (packageCommand === 'pnpm') {
    const existNpmrc = checkExist('.npmrc');
    const existPnpmLock = checkExist('pnpm-lock.yaml');
    deps = `
RUN npm install -g pnpm
COPY ${existPnpmLock ? 'pnpm-lock.yaml' : ''} ${existNpmrc ? '.npmrc' : ''} ./
${existPnpmLock ? 'RUN pnpm fetch' : ''}
COPY package.json ./
RUN pnpm install --frozen-lockfile --offline --ignore-scripts
  `;
    builder = `
RUN npm install -g pnpm
COPY --from=deps /workspace/node_modules ./node_modules
COPY . .
RUN ${buildCommand}
  `;
  }

  if (packageCommand === 'npm') {
    const existNpmrc = checkExist('.npmrc');
    const existPkgLock = checkExist('package-lock.json');
    deps = `
COPY ${existPkgLock ? 'package-lock.json' : ''} ${
      existNpmrc ? '.npmrc' : ''
    } package.json ./
RUN ${existPkgLock ? 'npm ci' : 'npm install'}
  `;

    builder = `
COPY --from=deps /workspace/node_modules ./node_modules
COPY . .
RUN ${buildCommand}
  `;
  }

  if (packageCommand === 'yarn') {
    const existYarnrc = checkExist('.yarnrc');
    const existYarnLock = checkExist('yarn.lock');
    deps = `
COPY ${existYarnLock ? 'yarn.lock' : ''} ${
      existYarnrc ? '.yarnrc' : ''
    } package.json ./
RUN ${existYarnLock ? 'yarn install --frozen-lockfile' : 'yarn install'}
  `;
    builder = `
COPY --from=deps /workspace/node_modules ./node_modules
COPY . .
RUN ${buildCommand}
  `;
  }

  if (!deps || !builder) {
    throw TypeError('TypeError: deps and builder cannot be null.');
  }

  const str = `
FROM node:${nodeVersion} as deps
WORKDIR /workspace
${deps}

FROM node:${nodeVersion} as builder
WORKDIR /workspace
${builder}

FROM nginx:${nginxVersion} as runer
WORKDIR /
COPY --from=builder /workspace/${output}/ /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /workspace/${dirPath}/nginx.conf /etc/nginx/conf.d/
  `;
  return str;
}

export default generateDockerfileContent;

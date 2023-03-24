import { Options } from '../typings';
import fs from 'fs';

function checkExist(filename: string) {
  return fs.existsSync(filename);
}

function generateDockerfileContent(
  options: Pick<Options, 'nodeVersion' | 'nginxVersion' | 'packageCommand'>
) {
  const { nodeVersion, nginxVersion, packageCommand } = options;

  let deps = `
RUN npm install -g pnpm
COPY pnpm-lock.yaml .npmrc ./
RUN pnpm fetch
COPY package.json ./
RUN pnpm install --frozen-lockfile --offline --ignore-scripts
  `;

  let builder = `
RUN npm install -g pnpm
COPY --from=deps /workspace/node_modules ./node_modules
COPY . .
RUN pnpm build
  `;

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
RUN npm build
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
RUN yarn build
  `;
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
COPY --from=builder /workspace/dist/ /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /workspace/nginx.conf /etc/nginx/conf.d/
  `;
  return str;
}

export default generateDockerfileContent;

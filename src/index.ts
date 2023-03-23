// import path from 'path';
import fs from 'fs';
import cpypto from 'crypto';

cpypto;

let options: Record<string, string> = {
  port: '2333',
  buildCommand: 'pnpm build',
  installCommand: 'pnpm install',
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

function generateDockerfile() {}

function generateDeployShell() {}

// exec run
function run() {}

// read .fool-tmp cache
function readCache() {}

function init() {
  collectOptions();
  generateDockerfile();
  generateDeployShell();
  run();
}

init();

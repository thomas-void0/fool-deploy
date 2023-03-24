import fs from 'fs';
import { Options } from '../typings';

let options: Options = {
  cache: true,
  port: 2333,
  packageCommand: 'pnpm',
  nodeVersion: '18.14-alpine',
  nginxVersion: '1.22.1',
  imageName: 'fool-deploy:prod',
};

function generateOptions() {
  const cwdPath = process.cwd();
  // read package.json for get name and version
  const pkgPath = `${cwdPath}/package.json`;
  if (fs.existsSync(pkgPath)) {
    const str = fs.readFileSync(pkgPath).toString('utf-8');
    const { name = 'foolDeploy', version = 'prod' } = JSON.parse(str);
    options.imageName = `${name}:${version}`;
  } else {
    throw new Error(
      `Error: ${cwdPath} not found package.json，shell must running in projcet root dir.`
    );
  }

  // read foolDeploy.json config
  const jsonPath = `${cwdPath}/fool-deploy.json`;
  if (fs.existsSync(jsonPath)) {
    const str = fs.readFileSync(jsonPath).toString('utf-8');
    const externalOptions = JSON.parse(str);
    options = { ...options, ...externalOptions };
  }

  return options;
}

export default generateOptions;

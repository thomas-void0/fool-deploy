import fs from 'fs';
import { Options } from '../typings';
import getPackageManager from './getPackageManager';

let options: Options = {
  cache: true,
  port: 2333,
  packageCommand: 'npm',
  nodeVersion: '18.14-alpine',
  nginxVersion: '1.22.1',
  imageName: 'fool-deploy:prod',
  output: 'dist',
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
  const jsonPath = `${cwdPath}/.foolrc`;
  if (fs.existsSync(jsonPath)) {
    const str = fs.readFileSync(jsonPath).toString('utf-8');
    const externalOptions = JSON.parse(str);
    options = { ...options, ...externalOptions };
  }

  const { imageName, packageCommand } = options;

  // insure imageName is valid
  if (imageName.split(':').length < 2) {
    options.imageName = `${imageName}:prod`;
  }

  // insure packageName is valid
  if (!['yarn', 'pnpm', 'npm'].includes(packageCommand)) {
    options.packageCommand = getPackageManager() || 'npm';
  }

  return options;
}

export default generateOptions;

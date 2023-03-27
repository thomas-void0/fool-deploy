import fs from 'fs';
import { Options } from '../typings';
import getPackageCommand from './getPackageCommand';
import getValidPort from './getValidPort';

let options: Options = {
  cache: true,
  port: 2333,
  nodeVersion: '18.14-alpine',
  nginxVersion: '1.22.1',
  imageName: 'fool-deploy:prod',
  output: 'dist',
};

async function generateOptions() {
  const cwdPath = process.cwd();
  // read package.json for get nam
  const pkgPath = `${cwdPath}/package.json`;
  if (fs.existsSync(pkgPath)) {
    const str = fs.readFileSync(pkgPath).toString('utf-8');
    const { name = 'fool-deploy' } = JSON.parse(str);
    options.imageName = `${name}:prod`;
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
  if (!packageCommand) {
    options.packageCommand = getPackageCommand();
  }

  // insure port is valid
  options.port = await getValidPort(options.port);

  return options;
}

export default generateOptions;

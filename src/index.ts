import fs from 'fs';
import shell from 'shelljs';
import generateHash from './lib/generateHash';
import generateOptions from './lib/generateOptions';
import isInstallDocker from './lib/isInstallDocker';
import generateDockerfileContent from './lib/generateDockerfileContent';
import config from './config';
import run from './lib/run';
import { Options } from './typings';
import generateNginxContent from './lib/generateNginxContent';

function create(options: Options, hash?: string) {
  const dirPath = options.cache ? config.cacheDir : config.tempDir;

  // del old dir
  shell.rm('-rf', config.cacheDir);
  shell.rm('-rf', config.tempDir);

  // create dir
  fs.mkdirSync(dirPath);

  const nginxContent = generateNginxContent();
  fs.writeFileSync(`${dirPath}/nginx.conf`, nginxContent);

  options.cache && fs.writeFileSync(`${dirPath}/.hash`, hash!);

  const dockerfileConent = generateDockerfileContent(options, dirPath);
  fs.writeFileSync(`${dirPath}/Dockerfile`, dockerfileConent);

  // run shell
  run(options, `${dirPath}/Dockerfile`);
}

function init() {
  // check docker install
  if (!isInstallDocker()) {
    throw Error(
      `Error: current environment not found docker, if you don't install docker, please see https://docs.docker.com/get-docker/ download docker.`
    );
  }
  const options = generateOptions();
  const { cache } = options;

  if (!cache) {
    return create(options);
  }
  // use cache
  const curHash = generateHash(options);
  const hashFilePath = `${config.cacheDir}/.hash`;

  // whether existsSync old cache dir
  if (!fs.existsSync(config.cacheDir)) {
    return create(options, curHash);
  }

  const prevHash = fs.existsSync(hashFilePath)
    ? fs.readFileSync(hashFilePath).toString('utf-8')
    : '';
  // whether update options
  curHash === prevHash
    ? run(options, `${config.cacheDir}/Dockerfile`)
    : create(options, curHash);
}

init();

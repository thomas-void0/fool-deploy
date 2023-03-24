import fs from 'fs';
import shell from 'shelljs';
import generateHash from './lib/generateHash';
import generateOptions from './lib/generateOptions';
import isInstallDocker from './lib/isInstallDocker';
import generateDockerfileContent from './lib/generateDockerfileContent';
import config from './config';
import run from './lib/run';
import { Options } from './typings';

function create(options: Options, hash?: string) {
  const dirPath = options.cache ? config.cacheDir : config.tempDir;
  // del old dir
  shell.rm(`-rf ${dirPath}`);

  // create dir
  fs.mkdirSync(dirPath);

  options.cache && fs.writeFileSync(`${dirPath}/.hash`, hash!);

  const dockerfileConent = generateDockerfileContent(options);
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

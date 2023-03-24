import shell from 'shelljs';
import { Options } from '../typings';

function logError(msg: string) {
  shell.echo(`Error: ${msg}`);
  shell.exit(1);
}

// check docker install
// function isInstallDocker() {
//   return shell.exec('docker version').code === 0;
// }

// install docker
// function installDocker() {
//   shell.exec('yum install -y yum-utils');
//   shell.exec(`
//     yum-config-manager \
//     --add-repo \
//     https://download.docker.com/linux/centos/docker-ce.repo
//   `);
//   shell.exec('yum makecache fast');
//   shell.exec('yum install docker-ce docker-ce-cli containerd.io');
// }

function run(options: Pick<Options, 'imageName' | 'port'>, filePath: string) {
  // if don't install docker
  // !isInstallDocker() && installDocker();

  // exec docker shell
  const { imageName, port } = options;

  const rmImages = shell.exec(`docker rmi -f ${imageName}`);
  if (rmImages.code !== 0) {
    return logError(`docker delete image ${imageName} failed.`);
  }

  const buildImages = shell.exec(
    `docker build --pull -t ${imageName} -f ${filePath} .`
  );
  if (buildImages.code !== 0) {
    return logError(`docker build image ${imageName} failed.`);
  }

  const [name] = imageName.split(':');
  const rmContainer = shell.exec(`docker rm -f ${name}`);
  if (rmContainer.code !== 0) {
    return logError(`docker delete container ${name} failed.`);
  }

  const runContainer = shell.exec(
    `docker run --name ${name} --restart=always -d -p ${port}:80 ${imageName}`
  );
  if (runContainer.code !== 0) {
    return logError(`docker run container ${name} failed.`);
  }

  console.log(`happy landing. deploy successful.`);
}

export default run;

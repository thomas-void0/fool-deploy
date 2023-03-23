import shell from 'shelljs';
import { Options } from '../typings';

function logError(msg: string) {
  shell.echo(`Error: ${msg}`);
  shell.exit(1);
}

// check docker install
function isInstallDocker() {
  return shell.exec('docker version').code === 0;
}

// install docker
function installDocker() {
  shell.exec('yum install -y yum-utils');
  shell.exec(`
    yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
  `);
  shell.exec('yum makecache fast');
  shell.exec('yum install docker-ce docker-ce-cli containerd.io');
}

function run(options: Pick<Options, 'tagName' | 'port'>) {
  // if don't install docker
  !isInstallDocker() && installDocker();

  // exec docker shell
  const { tagName, port } = options;

  const rmImages = shell.exec(`docker rmi -f ${tagName}`);
  if (rmImages.code !== 0) {
    return logError(`docker delete image ${tagName} failed.`);
  }

  const buildImages = shell.exec(
    `docker build --pull -t ${tagName} -f Dockerfile .`
  );
  if (buildImages.code !== 0) {
    return logError(`docker build image ${tagName} failed.`);
  }

  const [name] = tagName.split(':');
  const rmContainer = shell.exec(`docker rm -f ${name}`);
  if (rmContainer.code !== 0) {
    return logError(`docker delete container ${name} failed.`);
  }

  const runContainer = shell.exec(
    `docker run --name ${name} --restart=always -d -p ${port}:80 ${tagName}`
  );
  if (runContainer.code !== 0) {
    return logError(`docker run container ${name} failed.`);
  }
}

export default run;

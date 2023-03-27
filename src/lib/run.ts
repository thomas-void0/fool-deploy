import { exec, echo, exit, ShellString, rm } from 'shelljs';
import config from '../config';
import { Options } from '../typings';

function shellExec(result: ShellString, msg: string) {
  const { code } = result;
  if (code !== 0) {
    echo(`Error: ${msg}`);
    exit(1);
  }
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

function run(
  options: Pick<Options, 'imageName' | 'port' | 'cache'>,
  filePath: string
) {
  // if don't install docker
  // !isInstallDocker() && installDocker();

  // exec docker shell
  const { imageName, port, cache } = options;

  shellExec(
    exec(`docker rmi -f ${imageName}`),
    `docker delete image ${imageName} failed.`
  );

  shellExec(
    exec(`docker build --pull -t ${imageName} -f ${filePath} .`),
    `docker build image ${imageName} failed.`
  );

  const [name] = imageName.split(':');
  shellExec(
    exec(`docker rm -f ${name}`),
    `docker delete container ${name} failed.`
  );

  shellExec(
    exec(
      `docker run --name ${name} --restart=always -d -p ${port}:80 ${imageName}`
    ),
    `docker run container ${name} failed.`
  );

  // check cache
  if (!cache) rm('-rf', config.tempDir);

  console.log(`happy landing. deploy successful. visit: `);
}

export default run;

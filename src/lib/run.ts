import shell from 'shelljs';
import config from '../config';
import { Options } from '../typings';

/**
 * This function takes in a command and a message, runs the command, and exits the process if the command fails.
 * @param cmd - the command to run
 * @param msg - the message to display if the command fails
 */
function shellExec(cmd: string, msg: string) {
  const result = shell.exec(cmd, { silent: true });
  const { code, stderr } = result;

  if (code !== 0) {
    shell.echo(`Error: ${msg}`);
    shell.exit(1);
  }

  if (stderr) {
    shell.echo(`Error: ${msg}`);
    shell.exit(1);
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
    shell.exec(`docker rmi -f ${imageName}`),
    `docker delete image ${imageName} failed.`
  );

  shellExec(
    shell.exec(`docker build --pull -t ${imageName} -f ${filePath} .`),
    `docker build image ${imageName} failed.`
  );

  const [name] = imageName.split(':');
  shellExec(
    shell.exec(`docker rm -f ${name}`),
    `docker delete container ${name} failed.`
  );

  shellExec(
    shell.exec(
      `docker run --name ${name} --restart=always -d -p ${port}:80 ${imageName}`
    ),
    `docker run container ${name} failed.`
  );

  // check cache
  if (!cache) shell.rm('-rf', config.tempDir);

  console.log(
    `happy landing. deploy successful. running port is ${options.port}.`
  );
}

export default run;

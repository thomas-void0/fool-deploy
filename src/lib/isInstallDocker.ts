import shell from 'shelljs';

// check docker install
function isInstallDocker() {
  return shell.exec('docker version').code === 0;
}

export default isInstallDocker;

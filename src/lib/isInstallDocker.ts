import shell from 'shelljs';

// check docker install
export default function isInstallDocker() {
  const result = shell.exec('docker version');
  if (result.code === 0) {
    return true;
  }
  if (result.code === 127) {
    return false;
  }
  throw new Error(`Unable to check if Docker is installed: ${result.stderr}`);
}

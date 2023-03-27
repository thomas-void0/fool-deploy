import { Options } from '../typings';

// get user running pkgmanager info in terminal
function getPackageCommand(): Options['packageCommand'] {
  const managerInfo = process.env.npm_config_user_agent;
  if (managerInfo?.includes('yarn')) return 'yarn';
  if (managerInfo?.includes('pnpm')) return 'pnpm';
  return 'npm';
}

export default getPackageCommand;

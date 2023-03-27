import { Options } from '../typings';

// get user running pkgmanager info in terminal
function getPackageCommand(): Options['packageCommand'] | undefined {
  const managerInfo = process.env.npm_config_user_agent;
  return (['yarn', 'npm', 'pnpm'] as Options['packageCommand'][]).find(
    (command) => managerInfo?.includes(command)
  );
}

export default getPackageCommand;

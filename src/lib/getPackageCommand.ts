import { Options } from '../typings';

function getPackageManager(): Options['packageCommand'] {
  const packageManager = process.env.npm_config_user_agent;
  if (packageManager?.includes('yarn')) return 'yarn';
  if (packageManager?.includes('pnpm')) return 'pnpm';
  if (packageManager?.includes('npm')) return 'npm';
  throw Error('Unknown package manager');
}

export default getPackageManager;

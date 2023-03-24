export interface Options {
  cache: boolean;
  port: number;
  packageCommand: 'npm' | 'yarn' | 'pnpm';
  nodeVersion: string;
  nginxVersion: string;
  imageName: string;
}

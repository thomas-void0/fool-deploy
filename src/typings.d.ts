export interface Options {
  cache: boolean;
  port: number;
  packageCommand?: 'npm' | 'yarn' | 'pnpm';
  buildCommand?: string;
  imageName: string;
  nodeVersion: string;
  nginxVersion: string;
  output: string;
}

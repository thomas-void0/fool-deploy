import generateHash from '../lib/generateHash';

describe('generateHash', () => {
  it('check generate hash', () => {
    expect(
      generateHash({
        cache: true,
        port: 2333,
        packageCommand: 'pnpm',
        nodeVersion: '18.14-alpine',
        nginxVersion: '1.22.1',
        imageName: 'fool-deploy:prod',
      })
    ).toMatch(/^[a-fA-F0-9]{32}$/);
  });
});

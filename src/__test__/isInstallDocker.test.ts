import isInstallDocker from '../lib/isInstallDocker';

describe('isInstallDocker', () => {
  it('check docker version', () => {
    const result = isInstallDocker();
    expect(result.toString()).toMatch(/true|false/);
  });
});

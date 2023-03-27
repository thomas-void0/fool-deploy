import isInstallDocker from '../lib/isInstallDocker';

describe('isInstallDocker', () => {
  it('check docker version', () => {
    expect(isInstallDocker()).toBeFalsy();
  });
});

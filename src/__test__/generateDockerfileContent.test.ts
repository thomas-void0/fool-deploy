import config from '../config';
import generateDockerfileContent from '../lib/generateDockerfileContent';

describe('generateDockerfileContent', () => {
  it('generate dockerfile content', () => {
    expect(
      generateDockerfileContent(
        {
          packageCommand: 'yarn',
          nodeVersion: '18.14-alpine',
          nginxVersion: '1.22.1',
          output: 'dist',
        },
        `${process.cwd()}/${config.cacheDir}`
      )
    ).toMatch('COPY --from=builder');
  });
});

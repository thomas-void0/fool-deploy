import generateDockerfileContent from '../lib/generateDockerfileContent';

describe('generateDockerfileContent', () => {
  it('generate dockerfile content', () => {
    expect(
      generateDockerfileContent({
        packageCommand: 'yarn',
        nodeVersion: '18.14-alpine',
        nginxVersion: '1.22.1',
      })
    ).toMatch('COPY --from=builder /workspace/nginx.conf /etc/nginx/conf.d/');
  });
});

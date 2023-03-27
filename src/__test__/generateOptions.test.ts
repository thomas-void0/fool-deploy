import generateOptions from '../lib/generateOptions';

describe('generateOptions', () => {
  it('generate options', () => {
    const desiredHouse = {
      cache: expect.any(Boolean),
      port: expect.any(Number),
      packageCommand: expect.stringMatching(/npm|yarn|pnpm/),
      nodeVersion: expect.any(String),
      nginxVersion: expect.stringMatching(/^\d+(?:\.\d+){2}$/),
      imageName: expect.stringMatching(':'),
    };
    const o = generateOptions();
    expect(o).resolves.toMatchObject(desiredHouse);
  });
});

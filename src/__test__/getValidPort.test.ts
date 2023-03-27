import getValidPort from '../lib/getValidPort';

describe('getValidPort', () => {
  it('get Valid Port', async () => {
    const result = await getValidPort(3000);
    expect(result.toString()).toMatch(/^[0-9]*$/);
  });
});

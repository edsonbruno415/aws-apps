const {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
} = require('@jest/globals');

const { S3factory } = require('./../src/s3Service');

describe('Testing AWS Services offline with localstack', () => {
  it('test', async () => {
    const expected = 's3.amazonaws.com';
    const config = {
      isLocal: false,
      endpoint: 's3.amazonaws.com',
    };
    const result = S3factory(config);
    expect(result.config.endpoint).toStrictEqual(expected);
  });
});
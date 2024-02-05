const {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
} = require('@jest/globals');

const { S3 } = require('../../src/factory');
const { list, create } = require('../../src/index');

describe('Testing AWS Services offline with localstack', () => {
  const bucketParams = {
    Bucket: 'bucket-test-name',
  };
  beforeAll(async () => {
    await S3.createBucket(bucketParams).promise();
  });
  afterAll(async () => {
    await S3.deleteBucket(bucketParams).promise();
  });

  it('should return a S3 Bucket name', async () => {
    const expected = bucketParams.Bucket;
    const response = await list();
    const { Buckets } = JSON.parse(response.body);
    const BucketName = Buckets.find((bucketName) => bucketName === bucketParams.Bucket);
    expect(BucketName).toStrictEqual(expected);
    expect(response.statusCode).toStrictEqual(200);
  });

  it('should create a S3 Bucket', async () => {
    const bucketName = 'create-bucket-test';
    const response = await create({ body: JSON.stringify({ bucketName }) });
    const { message } = JSON.parse(response.body);
    expect(message).toStrictEqual('CREATE BUCKET');
    await S3.deleteBucket({
      Bucket: bucketName,
    }).promise();
  });

  it('should throw an error 500', async () => {
    const bucketName = '';
    const messageError = 'Internal server error: Error'
    create({ body: JSON.stringify({ bucketName }) })
      .then(() => { throw new Error('Error') })
      .catch((err) => {
        expect(messageError).toStrictEqual(`Internal server error: ${err.message}`);
      });
  });
});
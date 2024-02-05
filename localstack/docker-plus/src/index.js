'use strict';

const { S3 } = require("./factory");

module.exports.hello = async (event, context) => {

  const allBuckets = await S3.listBuckets().promise();

  console.log('found', allBuckets);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        Buckets: allBuckets.Buckets.map(bucket => bucket.Name),
      },
      null,
      2
    ),
  };
};

module.exports.create = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    if (!body) throw new Error('Need bucket name!');

    const { bucketName } = body;
    console.log('body', event.body);
    const bucketParams = {
      Bucket: bucketName,
    };
    await S3.createBucket(bucketParams).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'CREATE BUCKET',
        },
        null,
        2
      ),
    };
  } catch (err) {
    if (err.statusCode < 500) {
      return {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: `Error on create Bucket: ${err}`,
          },
          null,
          2
        ),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: `Internal server error: ${err}`,
        },
        null,
        2
      ),
    };
  }
};

'use strict';

const { S3 } = require("./factory");

module.exports.list = async (event) => {

  const allBuckets = await S3.listBuckets().promise();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        Buckets: allBuckets.Buckets.map(bucket => bucket.Name),
      },
    ),
  };
};

module.exports.create = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { bucketName } = body;
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
      ),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: `Internal server error: ${err}`,
        },
      ),
    };
  }
};

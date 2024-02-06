'use strict';

const AWS = require('aws-sdk');

const localConfig = {
  s3ForcePathStyle: true,
  endpoint: new AWS.Endpoint(`http://${process.env.LOCALSTACK_HOST || "localhost"}:4566`),
};

const S3factory = (config) => {
  const s3Config = {
    s3ForcePathStyle: true,
  };

  if(config.isLocal){
    return new AWS.S3(localConfig);
  }

  return new AWS.S3(s3Config);
}

module.exports = {
  S3factory,
};

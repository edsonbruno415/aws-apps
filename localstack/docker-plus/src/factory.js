'use strict';

const { S3factory } = require('./s3Service');
const Config = require('./config');
const config = Config();

module.exports = {
  S3: S3factory(config),
};
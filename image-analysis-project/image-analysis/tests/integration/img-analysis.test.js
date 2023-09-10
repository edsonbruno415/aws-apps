const {
  describe,
  it,
  test,
  expect,
} = require('@jest/globals');

const aws = require('aws-sdk');
aws.config.update({ region: 'us-east-1'});

const requestMock = require('./../mocks/request.json');
const { main } = require('../../src');

describe('Image analyser test suite', () => {
  test('it should analyse successfuly the image returning the results', async () => {
    const formattedText = [
      'A Imagem tem ',
      '98.91% de ser do tipo Animal',
      '98.91% de ser do tipo canino',
      '98.91% de ser do tipo cão',
      '98.91% de ser do tipo mamífero',
      '98.91% de ser do tipo animal de estimação',
      '90.24% de ser do tipo cachorrinho'
    ].join('\n')
    const expected = {
      statusCode: 200,
      body: formattedText,
    };
    const result = await main(requestMock);
    expect(result).toStrictEqual(expected);
  });
  test('given an empty queryString it should return status code 400', async () => {
    const expected = {
      statusCode: 400,
      body: "an Image url is required!"
    };
    const result = await main({ queryStringParameters: {} });
    expect(result).toStrictEqual(expected);
  });
  test('given an invalid ImageURL it should return status code 500', async ()=> {
    const expected = {
      statusCode: 500,
      body: "Internal Server Error!"
    };
    const result = await main({ 
      queryStringParameters: {
        imageUrl: 'invalid image url'
      } 
    });
    expect(result).toStrictEqual(expected);
  });
});

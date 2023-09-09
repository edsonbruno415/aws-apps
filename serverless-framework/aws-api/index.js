module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.api2 = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "API 2 running!",
        input: event,
      },
      null,
      2
    ),
  };
};

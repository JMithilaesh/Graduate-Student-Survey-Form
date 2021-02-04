//SWE 645 Assignment4, Team members: Avinash[G01163980], Rashi[G01225299], Rushil[G01203932], Mithilaesh[G01206238].
'use strict';
//AWS SDK for JavaScript in Node.js
const AWS = require('aws-sdk');
//AWS Lambda will expect an object that contains a handler function.
exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const params = {
    TableName: "Users"
  };

  try {
    const data = await documentClient.scan(params).promise();
    responseBody = JSON.stringify(data.Items);
    statusCode = 200;
  } catch(err) {
    responseBody = `Unable to get products: ${err}`;
    statusCode = 403;
  }
// Response
  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
      //CORS - to allow all to access
       "access-control-allow-origin": "*"
    },
    body: responseBody
  };

  return response;
};

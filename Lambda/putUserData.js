//SWE 645 Assignment4, Team members: Avinash[G01163980], Rashi[G01225299], Rushil[G01203932], Mithilaesh[G01206238].
"use strict";
//AWS SDK for JavaScript in Node.js
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });
//AWS Lambda will expect an object that contains a handler function.
exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

    let responseBody = "";
  let statusCode = 0;

  const {id, city, comments, dateOfSurvey, email, firstname, lastname, likedAboutCampus, likelyhoodOfRecommendation, originOfInterest, phone, raffle, state, streetAddress, zip } = JSON.parse(event.body);
// Parameters, which are expected. 
  // id is auto generated using the aws lambda request ID
  const params = {
      TableName: "Users",
      Item: {
          "id":context.awsRequestId,
            city: city,
            comments: comments,
            dateOfSurvey: dateOfSurvey,
            email:  email,
            firstname:  firstname,
            lastname: lastname,
            likedAboutCampus: likedAboutCampus,
            likelyhoodOfRecommendation: likelyhoodOfRecommendation,
            originOfInterest: originOfInterest,
            phone:  phone,
            raffle: raffle,
            state:  state,
            streetAddress:  streetAddress,
            zip:  zip
  }
};
 try {
    const data = await documentClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch(err) {
    responseBody = `Unable to put product: ${err}`;
    statusCode = 403;
  }
// Response
  const response = {
    statusCode: statusCode,
    headers: {
      //CORS - to allow all to access
      "Access-Control-Allow-Origin": '*',
      'Content-Type': 'application/json'
    },
    body: responseBody
  };
  return response;
};

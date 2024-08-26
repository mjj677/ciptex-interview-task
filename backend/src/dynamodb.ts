import AWS from "aws-sdk";

AWS.config.update({
  region: "eu-north-1",
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export default dynamoDB;

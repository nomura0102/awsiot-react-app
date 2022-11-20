"use strict";
const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  const date = new Date();
  const unixTimestamp = Math.floor(date.getTime() / 1000);
  const timestampForFilter = unixTimestamp - 86400; // 86400 == 24時間

  let responseBody = "";
  let statusCode = 0;

  const { sensorid } = event.pathParameters;

  const params = {
    TableName: "SensorData",
    KeyConditionExpression: "#field = :value and #timeField >= :timevalue",
    ExpressionAttributeNames: {
      "#field": "uuid",
      "#timeField": "timestamp",
    },
    ExpressionAttributeValues: {
      ":value": sensorid, 
      ":timevalue": timestampForFilter,
    },
    ScanIndexForward: false,
    Limit: 10,
  };

  try {
    const data = await documentClient.query(params).promise();
    responseBody = JSON.stringify(data.Items);
    statusCode = 200;
  } catch (err) {
    responseBody = `Unable to get sensor data: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    },
    body: responseBody,
  };

  return response;
};

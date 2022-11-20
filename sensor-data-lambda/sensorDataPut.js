"use strict";
const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  //  絶対湿度の計算　=217*(6.1078*10^(7.5*t/(t+237.3)))/(t+273.15)*RH/100
  const temperature = event.temperature;
  const humidity = event.humidity;
  const absHumi = (
    (((217 * ((6.1078 * 10) ^ ((7.5 * temperature) / (temperature + 237.3)))) /
      (temperature + 273.15)) *
      humidity) /
    100
  ).toFixed(2);
  // UnixTimestamp 桁数調整、TTL の計算
  const strTimeStamp = String(event.timestamp).slice(0, 10);

  const params = {
    TableName: "SensorData",
    Item: {
      uuid: event.imsi,
      imsi: event.imsi,
      timestamp: parseInt(strTimeStamp),
      datetime: event.datetime,
      battery: event.battery,
      temperature: temperature,
      humidity: humidity,
      latitude: event.latitude,
      longitude: event.longitude,
      absHumi: absHumi,
      TTL: strTimeStamp,
    },
  };

  try {
    const data = await documentClient.put(params).promise();
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
      "access-control-allow-origin": "*",
    },
    body: responseBody,
  };

  return response;
};

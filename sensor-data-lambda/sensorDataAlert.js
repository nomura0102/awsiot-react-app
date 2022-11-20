const AWS = require("aws-sdk");
const sns = new AWS.SNS();

exports.handler = async (event) => {
  let params = {
    TopicArn: process.env["snsArn"],
    Subject: "SensorAlert",
    Message: `お部屋の環境が乾燥しています。\n\n湿度が${event.payloads.humi} ％になりました。`,
  };

  console.log(event);
  await sns.publish(params).promise();
};

AWSの設定（データ連携と絶対湿度の計算）
    AWS IoTCoreのルールエンジン経由で、定義済みのLambda関数と連携、Lambda関数の中で、絶対湿度の計算後、DynamoDBへのデータ書き込み
    check
        PS C:\dev\awsiot-react-app> aws iot --version
        aws-cli/2.7.8 Python/3.9.11 Windows/10 exe/AMD64 prompt/off

        PS C:\dev\awsiot-react-app> aws iot list-topic-rules
        An error occurred (UnrecognizedClientException) when calling the ListTopicRules operation: The security token included in the request is invalid.

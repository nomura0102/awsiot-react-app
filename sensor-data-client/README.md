# AWS IoT&Reactで温湿度環境見える化（温湿度＋絶対湿度）IoTミニアプリ(クライアント)

## 概要

センサー　（温度、湿度）から取得したデータをSoracomのモバイル回線およびサービスを経由して、AWSに接続。AWSの中では、AWS IoTでソラコムからのデータをうけとり、Lambda経由でDynamoDBにいったん格納後、APIGateway,Lambda,ReactQuery等に連携し、データの加工や、リアルタイム画面表示を実現しています。
また、セキュリティの為、データ表示画面とAPIエンドポイントとの接続は、ログイン認証を必須としています。これを実現する為にAWSCognito,APIGatewayの機能を使用しています。

## アプリ機能概要

![image1](https://user-images.githubusercontent.com/45728258/153988156-86e2f503-33ab-425b-885f-0b42f53cd04b.png)

### 基本機能

センサーからのデータ（温度、湿度）をリアルタイムにグラフおよびテーブルに表示します。データは自動的に更新されます。
また、絶対湿度については、AWSLambdaで計算処理されたものを表示しています。
センサーが複数ある場合は、ドロップダウンメニューで切り替えます。

### ログイン機能

センサーデータ表示画面へのアクセスおよび、APIエンドポイントへのアクセスはログイン認証を必要とします。

### アラート機能

センサーデータが閾値を超えた場合、アラートを送信します。


## Tech Stack

### クラウド
- SORACOM Funnel
- AWS IoT Core
- Amazon Cognito
- Amazon API Gateway
- AWS Lambda
- Amazon DynamoDB
- Amazon Simple Notification Service（Amazon SNS）
- Amazon S3


### クライアント(使用ライブラリ)
- React
- React Query
- React Select
- Chart.js（react-chartjs-2）
　


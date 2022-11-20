import React from "react";
import { useQuery } from "react-query";
import { Auth } from "aws-amplify";
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";
// Do not remove
import Chart from "chart.js/auto";

const config = require("../config.json");

let chartTempData = [];
let chartHumidityData = [];
let chartAbsHumidityData = [];
let chartLabel = [];

const fetchData = async (sensorId) => {
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;
  const requestInfo = {
    headers: {
      Authorization: token,
    },
  };

  const url = `${config.api.invokeUrl}/sensordata/${sensorId}`;
  const res = await fetch(url, requestInfo);
  const data = await res.json();
  return data;
};

const ChartSection = ({ sensorId }) => {
  const { data, isError, error, isLoading } = useQuery(
    ["sensor-data",sensorId],
    () => fetchData(sensorId),
    {
      cacheTime: 0,
      refetchInterval: 1800000, // 30min
      refetchIntervalInBackground: true,
    }
  );

  let sensorData = [];

  if (!isLoading) {
    sensorData = [...data].sort((a, b) => a.timestamp - b.timestamp);

    chartTempData = sensorData.map((item) => item.temperature);
    chartHumidityData = sensorData.map((item) => item.humidity);
    chartAbsHumidityData = sensorData.map((item) => item.absHumi);
    chartLabel = sensorData.map((item) =>
      dayjs(item.timestamp * 1000).format("DD日 : HH:mm")
    );
  }

  const chartData = {
    labels: chartLabel,
    datasets: [
      {
        label: "温度(左軸)",
        backgroundColor: "#E15A28",
        borderColor: "#E15A28",
        pointBorderWidth: 4,
        data: chartTempData,
        yAxisID: "y1",
      },
      {
        label: "湿度（右軸）",
        backgroundColor: "#a9ceec",
        borderColor: "#a9ceec",
        pointBorderWidth: 4,
        data: chartHumidityData,
        yAxisID: "y2",
      },
      {
        label: "絶対湿度（右軸）",
        backgroundColor: "#007394",
        borderColor: "#007394",
        pointBorderWidth: 4,
        data: chartAbsHumidityData,
        yAxisID: "y2",
      },
    ],
  };

  const chartOptions = {
    tooltips: {
      mode: "nearest",
    },
    scales: {
      y1: {
        type: "linear",
        display: true,
        position: "left",
        beginAtZero: true,
        ticks: {
          min: 0,
          max: 100,
          stepSize: 1,
          fontColor: "#ffbaa2",
          callback: function (value, index, values) {
            return value + " ℃";
          },
        },
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",
        ticks: {
          min: 0,
          max: 100,
          stepSize: 5,
          fontColor: "#ffbaa2",
          callback: function (value, index, values) {
            return value + " %";
          },
        },
      },
    },
  };

  if (isLoading) {
    return <h2>Loading ChartSection... </h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div style={{ position: "relative", margin: "auto", width: "80vw" }}>
      <Line data={sensorData && chartData} options={chartOptions} />
    </div>
  );
};

export default ChartSection;

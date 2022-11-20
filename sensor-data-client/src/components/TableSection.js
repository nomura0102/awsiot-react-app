import React from "react";
import { useQuery } from "react-query";
import { Auth } from "aws-amplify";
import dayjs from "dayjs";

const config = require("../config.json");

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

const Tablesection = ({sensorId}) => {
  const { data, isError, error, isLoading } = useQuery(
    ["sensor-data", sensorId],
    () => fetchData(sensorId),
    {
      cacheTime: 0,
      refetchInterval: 1800000, // 30min
      refetchIntervalInBackground: true,
    }
  );

  let sensorData = [];

  if (!isLoading) {
    sensorData = [...data].sort((a, b) => b.timestamp - a.timestamp);
  }

  if (isLoading) {
    return <h2>Loading TableSection ... </h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }


  return (
    <table border="1">
      <thead>
        <tr>
          <th>時刻</th>
          <th>温度</th>
          <th>湿度</th>
          <th>絶対湿度</th>
        </tr>
      </thead>

      {sensorData &&
        sensorData.map((data, i) => (
          <tbody key={i}>
            <tr className="dataItemRow">
              <td>{dayjs(data.timestamp*1000).format("YYYY-MM-DD : HH:mm")}</td>
              <td> {data.temperature} ℃</td>
              <td> {data.humidity} %</td>
              <td> {data.absHumi} %</td>
            </tr>
          </tbody>
        ))}
    </table>
  );
};

export default Tablesection;

import { LineChart } from '@mui/x-charts/LineChart';
import * as React from 'react';

export default function BasicLineChart(props) {
  const xData = props.xData;
  const yData = props.yData;

    return (
    <LineChart

      xAxis={[{ data: xData }]}
      series={[
        {
          curve: "linear",
          data: yData,
        },
      ]}
      width={1000}
      height={600}
    />
  );
}
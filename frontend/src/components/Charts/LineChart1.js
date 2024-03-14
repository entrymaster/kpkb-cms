import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart1({ Data }) {
  return <Line data={Data} />;
}

export default LineChart1;

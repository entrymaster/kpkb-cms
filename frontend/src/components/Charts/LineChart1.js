import { Line } from "react-chartjs-2";

// LineChart1.js

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChart1 = ({ Data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      // If chart instance exists, destroy it before creating a new one
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: Data,
      options: {
        responsive: false, // Ensure chart doesn't resize
        maintainAspectRatio: false, // Ensure canvas doesn't resize
      },
    });

    return () => {
      // Cleanup function to destroy chart instance when component unmounts
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [Data]);

  return <canvas ref={chartRef} width="500" height="300" />; // Set fixed width and height
};

export default LineChart1;
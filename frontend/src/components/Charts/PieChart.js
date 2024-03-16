import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = ({ Data }) => {
  return (
    <div>
      <Pie
        data={Data}
        options={{
          legend: {
            display: true,
            position: 'bottom', // You can adjust the position as needed
            labels: {
              font: {
                size: 14, // Adjust font size as needed
              },
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
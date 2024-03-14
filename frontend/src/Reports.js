
import React, { useState, useEffect } from 'react';
import "./Dashboard.css";
import { Link } from "react-router-dom";
import BarChart from "./components/Charts/BarChart1.js";
import LineChart1 from "./components/Charts/LineChart1.js";
import PieChart from "./components/Charts/PieChart.js";
import Navbar from './Navbar';
import axios from "axios";

const Reports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chartData, setChartData] = useState({}); // Initialize with an empty object
  const userId = "user";
  const [flag, setFlag] = useState(0); 


  // const fetchSalesData = () => {
  //   if (startDate && endDate) {
  //     fetch(`http://localhost:5050/api/invoice/sales/${userId}?startDate=${startDate}&endDate=${endDate}`)
  //       .then((response) => {
  //         setChartData(response.data);
  //         setFlag(1);
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching sales data:', error);
  //       });
  //   }
  // };
  
  // useEffect(() => {
  //   fetchSalesData();
  // }, [startDate, endDate]);
  const fetchSalesData = () => {
    if (startDate && endDate) {
      axios.get(`http://localhost:5050/api/invoice/sales/${userId}?startDate=${startDate}&endDate=${endDate}`)
        .then((response) => {
          const salesData = response.data; // Assuming response.data contains sales data
          console.log(salesData);
          setFlag(1);
          const salesByDay = calculateSalesByDay(salesData); // Calculate sales by day
          const preparedChartData = prepareChartData(salesByDay); // Prepare chart data
          setChartData(preparedChartData); // Set chart data
        })
        .catch((error) => {
          console.error('Error fetching sales data:', error);
        });
    }
  };
  
  // useEffect(() => {
  //   fetchSalesData();
  // }, [startDate, endDate]);

  // Function to calculate sales by day
  const calculateSalesByDay = (salesData) => {
    const salesByDay = {};
    salesData.forEach((invoice) => {
      // Check if createdAt is already a Date object
      const createdAt = typeof invoice.createdAt === 'string' ? new Date(invoice.createdAt) : invoice.createdAt;
      const date = createdAt.toISOString().split('T')[0];
      salesByDay[date] = (salesByDay[date] || 0) + invoice.totalAmount;
    });
    return salesByDay;
  };

  // Function to prepare chart data
  const prepareChartData = (salesByDay) => {
    const labels = Object.keys(salesByDay);
    const data = Object.values(salesByDay);
    return {
      labels: labels,
      datasets: [{
        label: 'Total Sales',
        data: data,
      }],
    };
  };


  return (
    <div className="Reports">
        <Navbar/>
     
        <div className="main-container">
          <div>
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <div>
            <button onClick={fetchSalesData}>Fetch Sales Data</button>
            </div>
          {flag === 1 && ( // Conditionally render LineChart1 when flag is 1
            <div style={{ width: 500 }}>
              <LineChart1 Data={chartData} />
            </div>
          )}
        </div>
    </div>
  );
};
export default Reports;



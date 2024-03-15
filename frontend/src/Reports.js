
import React, { useState, useEffect, useContext } from 'react';
import "./Dashboard.css";
import { Link } from "react-router-dom";
import BarChart from "./components/Charts/BarChart1.js";
import LineChart1 from "./components/Charts/LineChart1.js";
import PieChart from "./components/Charts/PieChart.js";
import Navbar from './Navbar';
import axios from "axios";
import AuthContext from './AuthContext.js';
const Reports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chartData, setChartData] = useState({});
  const [chartData1, setChartData1] = useState({}); // Initialize with an empty object
  //const userId = "user";
  const [flag, setFlag] = useState(0); 
  const authContext = useContext(AuthContext);
  const userId = authContext.user;
  
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
          const profitsByDay = calculateProfitsByDay(salesData); // Calculate sales by day
          const preparedChartData1 = prepareChartData1(profitsByDay); // Prepare chart data
          setChartData1(preparedChartData1); // Set chart data
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
      salesByDay[date] = (salesByDay[date] || 0) + invoice.totalSales;
    });
    return salesByDay;
  };
  const calculateProfitsByDay = (salesData) => {
    const profitsByDay = {};
    salesData.forEach((invoice) => {
      // Check if createdAt is already a Date object
      const createdAt = typeof invoice.createdAt === 'string' ? new Date(invoice.createdAt) : invoice.createdAt;
      const date = createdAt.toISOString().split('T')[0];
      profitsByDay[date] = (profitsByDay[date] || 0) + invoice.totalSales - invoice.totalCostPrice;
    });
    return profitsByDay;
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
  const prepareChartData1 = (profitsByDay) => {
    const labels = Object.keys(profitsByDay);
    const data = Object.values(profitsByDay);
    return {
      labels: labels,
      datasets: [{
        label: 'Total Profit',
        data: data,
      }],
    };
  };


  return (
    <div className="Reports">
        <Navbar/>
     
        <div className="main-container" style={{ paddingTop: '120px' }}>
          <div >
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ width: '30%' }} />
          </div>
          <div>
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ width: '30%' }} />
          </div>
          <div>
            <button onClick={fetchSalesData}>See Graphs</button>
            </div>
          {flag === 1 && ( // Conditionally render LineChart1 when flag is 1
            <div style={{ width: '500px' }}>
              <LineChart1 Data={chartData} />

            </div>
            
          )}
          {flag === 1 && ( // Conditionally render LineChart1 when flag is 1
            <div style={{ width: '500px' }}>
              <LineChart1 Data={chartData1} />

            </div>
            
          )}
            </div>
            

    </div>
  );
};
export default Reports;



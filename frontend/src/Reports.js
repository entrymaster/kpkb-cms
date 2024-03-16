import React, { useState, useEffect, useContext } from "react";
import "./Dashboard.css";
import { Link, Navigate } from "react-router-dom";
import BarChart from "./components/Charts/BarChart1.js";
import LineChart1 from "./components/Charts/LineChart1.js";
import PieChart from "./components/Charts/PieChart.js";
import Navbar from "./Navbar";
import axios from "axios";
import AuthContext from "./AuthContext.js";
import './Reports.css'
const Reports = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState({});
  const [chartData1, setChartData1] = useState({});
  const [chartData2, setChartData2] = useState({});
  const [chartData3, setChartData3] = useState({});
   // Initialize with an empty object
  //const userId = "user";
  const [flag, setFlag] = useState(0);
  const authContext = useContext(AuthContext);
  const userId = authContext.user;

  useEffect(() => {
    fetchSalesData();
  }, [startDate, endDate]);
  const fetchSalesData = () => {
    if (startDate && endDate) {
  
      axios.get(`http://localhost:5050/api/invoice/sales/${userId}?startDate=${startDate}&endDate=${endDate}`)
        .then((response) => {
          const salesData = response.data; // Assuming response.data contains sales data
          console.log(salesData);
         
          //const allDates = generateDateArray(today, sevenDaysAgo);
          const salesByDay = calculateSalesByDay(salesData, startDate, endDate); // Calculate sales by day
          const preparedChartData = prepareChartData(salesByDay); // Prepare chart data
          console.log(salesByDay)
          setChartData(preparedChartData); // Set chart data
          const profitsByDay = calculateProfitsByDay(salesData, startDate, endDate); // Calculate sales by day
          const preparedChartData1 = prepareChartData1(profitsByDay); // Prepare chart data
          console.log(profitsByDay);
          setChartData1(preparedChartData1); // Set chart data
          const invoicesByDay = calculateInvoicesByDay(salesData, startDate, endDate); // Calculate sales by day
          const preparedChartData2 = prepareChartData2(invoicesByDay); // Prepare chart data
          console.log(invoicesByDay);
          setChartData2(preparedChartData2);
          const paymentModeDistributionData = calculatePaymentModeDistribution(salesData);
          console.log(paymentModeDistributionData);
          const preparedChartData3 = prepareChartData3(paymentModeDistributionData);
          console.log(preparedChartData3);
          setChartData3(preparedChartData3);
          setFlag(1);
        })
        .catch((error) => {
          console.error('Error fetching sales data:', error);
        });
    }
  };
  
  // Function to generate an array of dates from startDate to endDate
  // const generateDateArray = (startDate, endDate) => {
  //   const dateArray = [];
  //   let currentDate = new Date(startDate);
  //   while (currentDate <= endDate) {
  //     dateArray.push(new Date(currentDate));
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }
  //   return dateArray;
  // };
  
  // Function to calculate sales by day
  // Function to calculate sales by day
  const calculateSalesByDay = (salesData, startDate, endDate) => {
    const salesByDay = {};
    const currentDate = new Date(startDate);
    const end = new Date(endDate);
  
    while (currentDate <= end) {
      const currentDateISO = currentDate.toISOString().split('T')[0];
      salesByDay[currentDateISO] = 0; // Initialize sales for each day to 0
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
  
    salesData.forEach((invoice) => {
      const createdAt = new Date(invoice.createdAt);
      const date = createdAt.toISOString().split('T')[0];
      salesByDay[date] += invoice.totalSales;
    });
  
    return salesByDay;
  };
  
  // Function to calculate profits by day
  const calculateProfitsByDay = (salesData, startDate, endDate) => {
    const profitsByDay = {};
    const currentDate = new Date(startDate);
    const end = new Date(endDate);
  
    while (currentDate <= end) {
      const currentDateISO = currentDate.toISOString().split('T')[0];
      profitsByDay[currentDateISO] = 0; // Initialize profits for each day to 0
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
  
    salesData.forEach((invoice) => {
      const createdAt = new Date(invoice.createdAt);
      const date = createdAt.toISOString().split('T')[0];
      profitsByDay[date] += invoice.totalSales - invoice.totalCostPrice;
    });
  
    return profitsByDay;
  };

  const calculateInvoicesByDay = (salesData, startDate, endDate) => {
    const invoicesByDay = {};
    const currentDate = new Date(startDate);
    const end = new Date(endDate);
  
    while (currentDate <= end) {
      const currentDateISO = currentDate.toISOString().split('T')[0];
      invoicesByDay[currentDateISO] = 0; // Initialize sales for each day to 0
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
  
    salesData.forEach((invoice) => {
      const createdAt = new Date(invoice.createdAt);
      const date = createdAt.toISOString().split('T')[0];
      invoicesByDay[date] += 1;
    });
  
    return invoicesByDay;
  };
  const calculatePaymentModeDistribution = (salesData) => {
    let paidSalesData = 0;
    let totalCreditSales = 0;

    salesData.forEach((invoice) => {
      if (invoice.paymentMode === "Paid") {
        paidSalesData += invoice.totalSales;
      } else if (invoice.paymentMode === "Credit") {
        totalCreditSales += invoice.totalSales;
      }
    });

    return {
      paidSalesData,
      totalCreditSales
    };
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
  const prepareChartData2 = (invoicesByDay) => {
    const labels = Object.keys(invoicesByDay);
    const data = Object.values(invoicesByDay);
    return {
      labels: labels,
      datasets: [{
        label: 'Total Bills',
        data: data,
      }],
    };
  };
  // const prepareChartData3 = (data) => {
  //   return {
  //     labels: ["Paid", "Credit"],
  //     datasets: [{
  //       data: [data.paidSalesData, data.totalCreditSales],
  //       backgroundColor: ['#36A2EB', '#FFCE56'],
  //     }],
  //   };
  // };
  const prepareChartData3 = (paymentModeData) => {
    const labels = Object.keys(paymentModeData);
    const data = Object.values(paymentModeData);
    return {
      labels: labels,
      datasets: [{
        label: 'Payment Mode Distribution',
        data: data,
        backgroundColor: ['#36A2EB', '#FFCE56'],
      }],
    };
  };
  
  
  const auth = useContext(AuthContext);
  if (!auth.user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="Reports">
      <Navbar />

      <div className="main-container" style={{ paddingTop: "120px" }}>
        <div>
        <label style={{ display: "inline-block", margin: "20px" }}>Start Date: </label>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              // padding: "10px",
              height: "40px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxShadow: "none", // Remove default box-shadow
              fontSize: "16px",
              marginBottom: "10px",
              width: "30%",
              flex: "1",
            }}
          />
        {/* </div>
        <div> */}
        <label style={{ display: "inline-block",  margin: "20px" }}>End Date: </label>

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              // padding: "10px",
              height: "40px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxShadow: "none", // Remove default box-shadow
              fontSize: "16px",
              marginBottom: "10px",
              width: "30%",
              flex: "1",
            }}
          />
        </div>
        {/* <div style={{ paddingLeft: "30%" }}>
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          <button
            // onClick={fetchSalesData}
            // onClick={}
            style={{
              padding: "10px",
              marginLeft: "auto",
                 marginRight: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.3s",
              font: "15px",
            }}
          >
            See Graphs{" "}
          </button>
        </div> */}
        <div>
  {flag === 1 && (
    <div style={{minWidth:"400", width: "50%", maxWidth: "500px", display: "inline-block" }}>
      <LineChart1 Data={chartData} />
    </div>
  )}
  {flag === 1 && (
    <div style={{ minWidth:"400",width: "50%", maxWidth: "500px", display: "inline-block" }}>
      <LineChart1 Data={chartData1} />
    </div>
  )}
  {flag === 1 && (
    <div style={{ minWidth:"400",width: "50%", maxWidth: "500px", display: "inline-block" }}>
      <LineChart1 Data={chartData2} />
    </div>
  )}
  {flag === 1 && (
  <div style={{minWidth:"400", width: "50%", maxWidth: "500px", display: "inline-block" }}>
    <PieChart Data={chartData3} />
  </div>
  )}
</div>

      </div>
    </div>
  );
};
export default Reports;
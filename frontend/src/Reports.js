import React from "react";
import { useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import BarChart from "./components/Charts/BarChart1.js";
import LineChart from "./components/Charts/LineChart1.js";
import PieChart from "./components/Charts/PieChart.js";
import { UserData } from "./Data";

function Reports() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  return (
    <div className="Reports">
      <div className="container">
        <div className="left">
          <div className="left-top-box">
            <img src="logo1.png" alt="logo" width={220} height={80} />
          </div>
          <div className="left-mid-box">
            <img
              src="profile_icon.png"
              alt="Profile icon"
              width={80}
              height={80}
            />
            <div className="mid-text">
              <p>
                Firm Name
                <br />
                GST Number
              </p>
            </div>
          </div>
          <div className="nav-panel">
            <p>
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                Dashboard
              </Link>
            </p>
            <p>
              <Link
                to="/invoice"
                style={{ color: "white", textDecoration: "none" }}
              >
                Invoice
              </Link>
            </p>
            <p>
              <Link
                to="/inventory"
                style={{ color: "white", textDecoration: "none" }}
              >
                Inventory
              </Link>
            </p>
            <p>
              <Link
                to="/pendingTransactions"
                style={{ color: "white", textDecoration: "none" }}
              >
                Pending Transactions
              </Link>
            </p>
            <p>
              <Link
                to="/contactUs"
                style={{ color: "white", textDecoration: "none" }}
              >
                Contact Us
              </Link>
            </p>
            <p>
              <Link
                to="/Register"
                style={{ color: "white", textDecoration: "none" }}
              >
                Register
              </Link>
            </p>
            <p>
              <Link
                to="/TransactionHistory"
                style={{ color: "white", textDecoration: "none" }}
              >
                Transaction History
              </Link>
            </p>
            <p style={{ backgroundColor: "#E0E0F7" }}>
              <Link
                to="/Reports"
                style={{ color: "black", textDecoration: "none" }}
              >
                Reports
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div
        className="top-panel"
        style={{ display: "flex", justifyContent: "left", alignItems: "end" }}
      >
        <span
          style={{
            paddingInlineStart: "0.2cm",
            color: "white",
            fontSize: "1cm",
            fontFamily: '"Times New Roman"',
          }}
        >
          {" "}
          Reports
        </span>
      </div>
        <div className="main-container">
        <div style={{ width: 300 }}>
            <PieChart chartData={userData} />
          </div>
          <div style={{ width: 300 }}>
            <BarChart chartData={userData} />
          </div>
          <div style={{ width: 500 }}>
            <LineChart chartData={userData} />
          </div>
          
        </div>
       
    </div>
  );
}

export default Reports;

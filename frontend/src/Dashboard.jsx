import React from 'react';

function Dashboard() { 
  return (<>
    <div className="container">
      <div className="left">
        <div className="left-top-box">
          <img src="logo1.png" alt="logo" width={220} height={80} />
        </div>
        <div className="left-mid-box">
          <img src="profile_icon.png" alt="Profile icon" width={80} height={80} />
          <div className="mid-text">
            <p>
              Firm Name
              <br />
              GST Number
            </p>
          </div>
        </div>
        <div className="nav-panel">
          {/* <h2>Navigation</h2> */}
          <div style={{ backgroundColor: "#E0E0F7" }}>
            <a href="#" className="nav-link" style={{ color: "black" }}>
              Dashboard
            </a>
          </div>
          <a href="Invoice.jsx" className="nav-link">
            Invoice
          </a>
          <a href="Inventory.jsx" className="nav-link">
            Inventory
          </a>
          <a href="PendingTransactions.jsx" className="nav-link">
            Pending Transactions
          </a>
          <a href="TransactionHistory.jsx" className="nav-link">
            Transaction History
          </a>
          <a href="Reports.jsx" className="nav-link">
            Reports
          </a>
          <a href="FAQs.jsx" className="nav-link">
            FAQs
          </a>
          <a href="ContactUs.jsx" className="nav-link">
            Contact Us
          </a>
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
          fontFamily: '"Times New Roman"'
        }}
      >
        {" "}
        Dashboard
      </span>
    </div>
    <div
      className="main-container"
      style={{ display: "flex", justifyContent: "space-around", paddingTop: 20 }}
    >
      <div className="data-box">
        <p
          style={{
            fontSize: "x-large",
            fontFamily: '"Times New Roman", Times, serif'
          }}
        >
          Today's Sales
          <br />₹ 1,08,324
        </p>
      </div>
      <div className="data-box">
        <p
          style={{
            fontSize: "x-large",
            fontFamily: '"Times New Roman", Times, serif'
          }}
        >
          Today's Profit
          <br />₹ 15,240
        </p>
      </div>
      <div className="data-box">
        <p
          style={{
            fontSize: "x-large",
            fontFamily: '"Times New Roman", Times, serif'
          }}
        >
          Today's Bills
          <br />
          40
        </p>
      </div>
      <div className="data-box">
        <p
          style={{
            fontSize: "x-large",
            fontFamily: '"Times New Roman", Times, serif'
          }}
        >
          Yesterday's Sales
          <br />₹ 1,18,729
        </p>
      </div>
    </div>
  </>
  )
    }
export default Dashboard;

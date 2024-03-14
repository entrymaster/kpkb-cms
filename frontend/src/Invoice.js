import React, { useState } from 'react';
import './Invoice.css';
import { Link } from "react-router-dom";
import AddNewInvoice from './components/Invoice/AddInvoice';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventoryIcon from '@mui/icons-material/Inventory';
import PendingTransactionsIcon from '@mui/icons-material/PendingActions';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';

const Invoice = () => {
    return (
    <div className="Invoice">
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
                <br/>
                GST Number
              </p>
            </div>
          </div>
          <div className="nav-panel">
            <p>
              <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none' }}>
  <HomeIcon style={{ marginRight: '5px' }}/><strong>Dashboard</strong></Link>
            </p>
            <p style={{ backgroundColor: "#517f89" }}>
              <Link to="/invoice" style={{ display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none' }}>
  <ReceiptIcon style={{ marginRight: '5px' }}/><strong>Invoice</strong></Link>
            </p>
            <p>
            <Link to="/inventory" style={{ display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none' }}>
  <InventoryIcon style={{ marginRight: '5px' }} />
  <strong>Inventory</strong>
</Link>
            </p>
            <p>
            <Link to="/pending-transactions" style={{ display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none' }}>
  <PendingTransactionsIcon style={{ marginRight: '5px' }} />
  <strong>Pending Transactions</strong>
</Link>

            </p>
            <p>
            <Link to="/contact-us" style={{ display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none' }}>
  <SupportAgentIcon style={{ marginRight: '5px' }} />
  <strong>Contact Us</strong>
</Link>

            </p>
          <p>
          <Link to="/transaction-history" style={{ display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none' }}>
  <HistoryIcon style={{ marginRight: '5px' }} />
  <strong>Transaction History</strong>
</Link>
          </p>
          <p>
          <Link to="/reports" style={{ display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none' }}>
  <BarChartIcon style={{ marginRight: '5px' }} />
  <strong>Reports</strong>
</Link>
          </p>
          </div>
        </div>
      </div>
      <div className="top-panel">
        <div style={{ textAlign: "left", marginLeft: 10, marginTop: 15 }}>
          <h1 style={{ color: "#fff", fontSize: 40 }}>Invoice</h1>
        </div>
      </div>
      <AddNewInvoice/>
  </div>
  );
    
}
export default Invoice;




import React from 'react';
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
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';

import Navbar from './Navbar';
const iconSize = 32;

const Invoice = () => {
    return (
    <div className="Invoice">
      <Navbar/>
      {/* <div className="container">
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
          <div className="nav-panel" style = {{}}>
            <p>
              <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none' }}>
                <HomeIcon style={{ marginRight: '5px' }}/><strong>Dashboard</strong>
              </Link>
            </p>
            <p style={{ backgroundColor: "#517f89" }}>
              <Link to="/invoice" style={{ display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none' }}>
                <ReceiptIcon style={{ marginRight: '5px' }}/><strong>Invoice</strong>
              </Link>
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
        <div style={{ textAlign: "left", left: 10, marginLeft: 10, marginTop: 25 }}>
            <h1 style={{ color: "#fff", fontSize: 40 }}>Invoice</h1>
        </div>
        <div style={{ position: 'absolute', top: 60, right: 10 }}>
          <Tooltip title="Notifications">
              <NotificationsIcon style={{ color: "#fff", fontSize: iconSize, marginRight: '15px' }} />
          </Tooltip>
          <Tooltip title="Settings">
              <SettingsIcon style={{ color: "#fff", fontSize: iconSize, marginRight: '15px' }} />
          </Tooltip>
          <Tooltip title="Profile">
              <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <AccountCircleIcon style={{ color: "#fff", fontSize: iconSize, marginRight: '15px' }} />
              </Link>
          </Tooltip>
          <Tooltip title="Logout">
              <LogoutIcon style={{ color: "#fff", fontSize: iconSize }} />
          </Tooltip>
        </div>
      </div> */}
      {/* <div className="top-panel">
      <div style={{ textAlign: "left" }}>
            <h1 style={{ color: "#fff", fontSize: 40 }}>Invoice</h1>
          </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight:'100px' }}>
          
          <div>
            <NotificationsIcon style={{ color: "#fff", marginRight: '100px' }} />
            <SettingsIcon style={{ color: "#fff", marginRight: '15px' }} />
            <AccountCircleIcon style={{ color: "#fff", marginRight: '15px' }} />
            <LogoutIcon style={{ color: "#fff", marginRight: '100px' }} />
          </div>
        </div>
      </div> */}
      {/* <div className="top-panel">
        <div style={{ textAlign: "left", marginLeft: 10, marginTop: 15 }}>
          <h1 style={{ color: "#fff", fontSize: 40 }}>Invoice</h1>
        </div>
      </div> */}
      <AddNewInvoice/>
    </div>
  );
}

export default Invoice;

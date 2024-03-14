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
      <AddNewInvoice/>
    </div>
  );
}

export default Invoice;

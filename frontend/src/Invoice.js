import React from 'react';
import './Invoice.css';
import AddNewInvoice from './components/Invoice/AddInvoice';

import Navbar from './Navbar';

const Invoice = () => {
    return (
    <div className="Invoice">
      <Navbar/>
      <AddNewInvoice/>
    </div>
  );
}

export default Invoice;

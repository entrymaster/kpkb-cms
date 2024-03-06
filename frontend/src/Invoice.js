import React, { useState } from 'react';
import './Invoice.css';
import { Link } from "react-router-dom";
// import AddRowDialog from './components/Invoice/AddRow';
// import {initialState} from './components/Invoice/initialState';
// import DeleteIcon from '@mui/icons-material/Delete';
import AddNewInvoice from './components/Invoice/AddInvoice';

const Invoice = () => {
  // const [invoiceData, setInvoiceData] = useState(initialState);
  // const handleInputChange = (event, index, fieldName) => {
  //   const { value } = event.target;
  //   const updatedItemList = [...invoiceData.itemList];
  //   updatedItemList[index] = {
  //     ...updatedItemList[index],
  //     [fieldName]: value
  //   };
  //   setInvoiceData({
  //     ...invoiceData,
  //     itemList: updatedItemList
  //   });
  // };
  // const handleAddField = (e) => {
  //   e.preventDefault()
  //   setInvoiceData((prevState) => ({...prevState, itemList: [...prevState.itemList,  {itemName: '', quantity:0, rate:0, discount:0,gst:0, amount:0}]}))
  // }

  // const handleDeleteRow = (index) => {
  //   setInvoiceData((prevData) => {
  //     const updatedItemList = [...prevData.itemList];
  //     updatedItemList.splice(index, 1);
  //     return {
  //       itemList: updatedItemList,
  //     };
  //   });
  // };

  

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
              <Link to="/" style={{color: "white",  textDecoration: 'none'}}>Dashboard</Link>
            </p>
            <p style={{ backgroundColor: "#E0E0F7" }}>
              <Link to="/invoice" style={{color: "black", textDecoration: 'none'}}>Invoice</Link>
            </p>
            <p>
              <Link to="/inventory" style={{color: "white", textDecoration: 'none'}}>Inventory</Link>
            </p>
            <p>
              <Link to="/pendingTransactions" style={{color: "white", textDecoration: 'none'}}>Pending Transactions</Link>
            </p>
            <p>
              <Link to="/contactUs" style={{color: "white", textDecoration: 'none'}}>Contact Us</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="top-panel">
        <div style={{ textAlign: "left", marginLeft: 250, marginTop: 15 }}>
          <h1 style={{ color: "#fff", fontSize: 40 }}>Invoice</h1>
        </div>
      </div>
      <AddNewInvoice/>
  </div>
  );
    
}


export default Invoice;




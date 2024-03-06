import React, { useState } from 'react';
import './Invoice.css';
import { Link } from "react-router-dom";
import AddRowDialog from './components/Invoice/AddRow';
const Invoice = () => {
  const [showDialog, setShowDialog] = useState(false);

  const showAddNewItemDialog = () => {
    setShowDialog(true);
  };

  const hideAddNewItemDialog = () => {
    setShowDialog(false);
  };

  function saveNewItem(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Retrieve form input values
    const itemName = document.getElementById("itemName").value;
    const itemId = document.getElementById("itemId").value;
    const itemQuantity = document.getElementById("itemQuantity").value;
    const category = document.getElementById("category").value;
    const salesPrice = document.getElementById("salesPrice").value;
    const costPrice = document.getElementById("costPrice").value;
    const GST = document.getElementById("GST").value;
    const batchExpiry = document.getElementById("batchExpiry").value;
  
    // Validate input values if necessary
    // For example, check if required fields are not empty
  
    // Perform any necessary processing or data manipulation
  
    // Example: Construct a new item object
    const newItem = {
      itemName,
      itemId,
      itemQuantity,
      category,
      salesPrice,
      costPrice,
      GST,
      batchExpiry
    };
  
    // Example: Make an API call to save the new item
    // Replace this with your actual API call
    // Assuming an async API call with fetch
    fetch('/invoice/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to save item');
      }
      // Handle success case
      // For example, display a success message
      alert('Item saved successfully');
      // Optionally, reset the form or close the dialog
      // ResetForm();
      // hideAddNewItemDialog();
    })
    .catch(error => {
      // Handle error case
      // For example, display an error message
      console.error('Error saving item:', error.message);
      alert('Failed to save item');
    });
  }
    return (
    <>
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
          <h1 style={{ color: "#fff", fontSize: 40 }}>Inventory</h1>
        </div>
      </div>
      <div className="main-container">
        <div className="top">
          <div className="search-bar-container">
            <input type="text" className="input-box" placeholder="Customer Name" />
            <input type="text" className="input-box" placeholder="Invoice Number" />
            <br />
            <br />
            <input type="text" className="input-box" placeholder="Customer Email" />
            <input type="text" className="input-box" placeholder="Customer Phone No." />
            <br />
            <br />
          </div>
          </div>
          <table id="invoiceTable">
        <thead>
            <tr class="headers">
                <th>ITEM DETAILS</th>
                <th>DISCOUNT</th>
                <th>QUANTITY</th>
                <th>RATE</th>
                <th>AMOUNT</th>
            </tr>
        </thead>
        <tbody id="new-item-table-body">
            <tr class="First">
                <td>Type or Click to select an item.</td>
                <td>0%</td>
                <td>0.00</td>
                <td>0.00</td>
                <td>0.00</td>
            </tr>
        </tbody>
      </table>
        
        <button id="add-new-item" type = "button" onClick={showAddNewItemDialog}> <strong> Add New Item </strong> </button>
      {/* {showDialog} */}
      <AddRowDialog 
        showDialog = {showAddNewItemDialog}
        onCancel = {hideAddNewItemDialog}
      />
    <button id="scan-using-barcode">Scan Using Barcode</button>
    <div className="search-bar-container2">
      {/* { <a>Customer Notes</a> } */}
      <br />
      <input
        type="text"
        className="input-box"
        placeholder="Thanks for your visit. Come again!.."
      />
    </div>
    <div className="bottom">
      <button id="add-as-credit">Add As Credit</button>
      <button id="preveiw-bill">Preveiw Bill</button>
      <button id="generate-bill">Generate Bill </button>
    </div>
  </div>
  </>);
    
}


export default Invoice;




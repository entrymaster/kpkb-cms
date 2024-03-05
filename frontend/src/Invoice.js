import React from 'react';
import './Invoice.css';
import { Link } from "react-router-dom";

const Invoice = () => {
    return <div><div className="container">
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
  <div style={{ backgroundColor: "#E0E0F7" }}>
          <a
            href=" /Invoice.js.html"
            className="nav-link"
            style={{ color: "black" }}
          >
            Invoice
          </a>
        </div>  </div>
  <div className="main-container">
    <div className="top">
      <div className="search-bar-container">
        <input type="text" className="input-box" placeholder="Customer Name" />
        <input type="text" className="input-box" placeholder="Invoice Number" />
        <br />
        <br />
        <input type="text" className="input-box" placeholder="Customer Email" />
        <input
          type="text"
          className="input-box"
          placeholder="Customer Phone No."
        />
        <br />
        <br />
      </div>
    </div>
  </div>
  <button id="add-new-item" onclick="showAddNewItemDialog()">
    Add New Item
  </button>
  <dialog id="addNewItemDialog">
    <form onsubmit="saveNewItem(); return false;">
      <label htmlFor="itemName">Item Name:</label>
      <input type="text" id="itemName" required="" />
      <br />
      <label htmlFor="itemId">Item Id :</label>
      <input type="text" id="itemId" required="" />
      <br />
      <label htmlFor="itemQuantity">Quantity:</label>
      <input type="text" id='itemQuantity"' required="" />
      <br />
      <label htmlFor="category">Category:</label>
      <input type="text" id="category" />
      <br />
      <label htmlFor="salesPrice">Sales Price/unit :</label>
      <input type="text" id="salesPrice" required="" />
      <br />
      <label htmlFor="costPrice">Cost Price/unit:</label>
      <input type="text" id="costPrice" required="" />
      <br />
      <label htmlFor="GST">GST:</label>
      <input type="text" id="GST" />
      <br />
      <label htmlFor="batchExpiry">Batch Expiry:</label>
      <input type="text" id="batchExpiry" required="" />
      <br />
      <button type="submit">Save</button>
      <button type="button" onclick="hideAddNewItemDialog()">
        Cancel
      </button>
    </form>
  </dialog>
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
  </div></div>;
    
}


export default Invoice;




import React from 'react';
import "./pending transactions.css";
import { Link } from "react-router-dom";

function showAddCreditDialog() {
  var dialog = document.getElementById("addCreditDialog");
  dialog.showModal();
}

function hideAddCreditDialog() {
  var dialog = document.getElementById("addCreditDialog");
  dialog.close();
}
function saveCredit() {
  // Get the input values from the form
  var customerName = document.getElementById("customerName").value;
  var phoneNo = document.getElementById("phoneNo").value;
  var amount = document.getElementById("amount").value;
  var addBill = document.getElementById("addBill").value;

  // Get the table body
  var tableBody = document.getElementById("credit-table-body");

  // Create a new row
  var newRow = tableBody.insertRow();

  // Create cells for the new row
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);

  // Add content to the cells
  cell1.textContent = customerName;
  cell2.textContent = phoneNo;
  cell3.textContent = amount;
  cell4.textContent = addBill;

  // Close the dialog
  hideAddCreditDialog();
}
function PendingTransactions() 
{
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
            <br />
            GST Number
          </p>
        </div>
      </div>
      <div className="nav-panel">
          <p>
          <Link to="/" style={{color: "white",  textDecoration: 'none'}}>Dashboard</Link>
          </p>
          <p>
          <Link to="/invoice" style={{color: "white", textDecoration: 'none'}}>Invoice</Link>
          </p>
          <p>
          <Link to="/inventory" style={{color: "white", textDecoration: 'none'}}>Inventory</Link>
          </p>
          <p style={{ backgroundColor: "#E0E0F7" }}>
          <Link to="/pendingTransactions" style={{color: "black", textDecoration: 'none'}}>Pending Transactions</Link>
          </p>
          <p>
          <Link to="/contactUs" style={{color: "white", textDecoration: 'none'}}>Contact Us</Link>
          </p>
      </div>
    </div>
  </div>
  <div className="top-panel">
    <a className="heading">Pending Transactions</a>
  </div>
  <div className="main-container">
    <div className="top">
      <div className="search-bar-container">
        <input type="text" className="search-bar" placeholder="Search" />
      </div>
      <div className="TotalCredit">
        <h1>Total Credit:</h1>
        <a className="credit"> 10000</a>
      </div>
    </div>
  </div>
  <div className="credit-debit-heading">
    <div className="credit-debit-left">
      <h2>Credit</h2>
    </div>
    <div className="credit-debit-right">
      <h2>Debit</h2>
    </div>
  </div>
  <table>
    <thead>
      <tr className="headers">
        <th>Customer Name/ID</th>
        <th>Phone No.</th>
        <th>Amount</th>
        <th id="add-credit-button" onclick="showAddCreditDialog()">
          Add New Credit
        </th>
      </tr>
    </thead>
    <tbody id="credit-table-body">
      <tr className="First">
        <td>Ramlal</td>
        <td>900XXXXXXX</td>
        <td>5000</td>
        <td>View Bills</td>
      </tr>
      <tr className="Second">
        <td>Shymlal</td>
        <td>80XXXXXXXX</td>
        <td>50000</td>
        <td>View Bills</td>
      </tr>
      {/* Add more rows as needed */}
    </tbody>
  </table>
  <dialog id="addCreditDialog">
    <form onSubmit="saveCredit(); return false;">
      <label htmlFor="customerName">Customer Name/ID:</label>
      <input type="text" id="customerName" required="" />
      <br />
      <label htmlFor="phoneNo">Phone No.:</label>
      <input type="text" id="phoneNo" required="" />
      <br />
      <label htmlFor="amount">Amount:</label>
      <input type="text" id="amount" required="" />
      <br />
      <label htmlFor="addBill">Add Bill Option:</label>
      <input type="text" id="addBill" />
      <br />
      <button type="submit">Save</button>
      <button type="button" onClick={hideAddCreditDialog}>
      Cancel
     </button>
    </form>
  </dialog>
</>

    )
}
export default PendingTransactions;
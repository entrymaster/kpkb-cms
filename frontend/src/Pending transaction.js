import React, {useState} from 'react';
import "./pending transactions.css";
import "./components/PendingTransactions/AddNewEntry";
import "./components/PendingTransactions/UpdateEntry";
import { Link } from "react-router-dom";

const PendingTransactions = () => {
  const [isAddCreditDialogVisible, setAddCreditDialogVisibility] = useState(false);
  const toggleAddCreditDialog = () => {
    setAddCreditDialogVisibility(!isAddCreditDialogVisible);
    console.log({isAddCreditDialogVisible});
  };

    return (
        <div className="PendingTrans">
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
        <th id="add-credit-button" onClick={toggleAddCreditDialog}>
          Add New Credit
        </th>
         <AddNewEntry
        isVisible={isAddCreditDialogVisible} onCancel={toggleAddCreditDialog} entryType="Customer"
       /> 
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
</div>

    )
}
export default PendingTransactions;
import React, { useState }  from 'react';
import "./Pending transactions.css";
import { Link } from "react-router-dom";

function PendingTransactions() 
{  const [isAddCreditDialogOpen1, setIsAddCreditDialogOpen1] = useState(false);
  const [isAddCreditDialogOpen2, setIsAddCreditDialogOpen2] = useState(false);
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [selectedCustomerType, setSelectedCustomerType] = useState('new'); // Initial customer type
  const [tableData, setTableData] = useState([
    // Initial data for existing rows
    { name: 'Ramlal', phone: '900XXXXXXX', amount: 5000 },
    { name: 'Shymlal', phone: '80XXXXXXXX', amount: 50000 },
  ]);
  
  const showCustomerDialog = () => {
    setIsAddCreditDialogOpen1(false);
    setIsAddCreditDialogOpen2(false);


    setIsCustomerDialogOpen(true);
  };
  const showAddCreditDialog1 = () => {
      setIsCustomerDialogOpen(false);

    setIsAddCreditDialogOpen1(true);
  };
  const showAddCreditDialog2 = () => {
    setIsCustomerDialogOpen(false);

  setIsAddCreditDialogOpen2(true);
};
  const hideCustomerDialog = () => {
    setIsCustomerDialogOpen(false);
  };
  const hideAddCreditDialog1 = () => {
    setIsAddCreditDialogOpen1(false);
  };
  const hideAddCreditDialog2 = () => {
    setIsAddCreditDialogOpen2(false);
  };
   const handleCustomerTypeChange = (event) => {
    setSelectedCustomerType(event.target.value);
  };

  // const saveCredit = (event) => {
  //   event.preventDefault(); // Prevent default form submission

  //   // Get the input values from the form (same logic as before)
  //   var customerName = document.getElementById("customerName").value;
  //   var phoneNo = document.getElementById("phoneNo").value;
  //   var amount = document.getElementById("amount").value;
  //   var addBill = document.getElementById("addBill").value;
  
  //   // Get the table body
  //   var tableBody = document.getElementById("credit-table-body");
  
  //   // Create a new row
  //   var newRow = tableBody.insertRow();
  
  //   // Create cells for the new row
  //   var cell1 = newRow.insertCell(0);
  //   var cell2 = newRow.insertCell(1);
  //   var cell3 = newRow.insertCell(2);
  //   var cell4 = newRow.insertCell(3);
  
  //   // Add content to the cells
  //   cell1.textContent = customerName;
  //   cell2.textContent = phoneNo;
  //   cell3.textContent = amount;
  //   cell4.textContent = addBill;

  //   // Close the dialog after saving
  //   hideAddCreditDialog();
  // };
  const saveCredit = (customerName, phoneNo,Email, InvoiceID ,amount) => {
    // event.preventDefault(); // Assuming this is passed from the form

    const newTableData = [...tableData, {
      name: customerName,
      phone: phoneNo,
      // email:Email,
      // InvoiceID:InvoiceID,
      amount: amount,

    }];

    setTableData(newTableData);
   // hideAddCreditDialog();
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
        <th>
        <button onClick={showCustomerDialog}>Add New Credit</button>
        </th>
      </tr>
    </thead>
    <tbody id="credit-table-body">
      {/* <tr className="First">
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
      Add more rows as needed */}
      {tableData.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.phone}</td>
              {/* <td>{row.email}</td>
              <td>{row.InvoiceID}</td> */}
              <td>{row.amount}</td>

              <td>View Bills</td>
            </tr>
          ))}
    </tbody>
  </table>
  {/* <dialog id="addCreditDialog" open={isAddCreditDialogOpen}>
    <form onSubmit="saveCredit(); return false;">
    <form onSubmit={() => saveCredit(document.getElementById("customerName/Id").value, document.getElementById("phoneNo").value, document.getElementById("Email").value, document.getElementById("InvoiceID").value, document.getElementById("amount").value)}>
      <label htmlFor="customerName/Id">Customer Name/ID:</label>
      <input type="text" id="customerName/Id" required="" />
      <br />
      <label htmlFor="phoneNo">Phone No.:</label>
      <input type="text" id="phoneNo" required="" />
      <br />
      <label htmlFor="Email">Email:</label>
      <input type="text" id="Email" required="" />
      <br />
      <label htmlFor="InvoiceID">Invoice Id:</label>
      <input type="text" id="InvoiceID" required="" />
      <br />
      <label htmlFor="amount">Amount:</label>
      <input type="text" id="amount" required="" />
      <br />
      
      <button type="submit">Save</button>
      <button type="button" onClick={hideAddCreditDialog}>
      Cancel
     </button>
    </form>

  </dialog> */}

<dialog id="addCustomerDialog" open={isCustomerDialogOpen}>
{/* <label>
              Customer Type:
              <select value={selectedCustomerType} onChange={handleCustomerTypeChange}>
                <option value="new">New Customer</option>
                <option value="existing">Existing Customer</option>
              </select>
            </label> */}
            <button onClick={showAddCreditDialog1}>Add New Entry</button> <br/>

            <button onClick={showAddCreditDialog2}>Update Existing Entry</button>
            </dialog>
            
<dialog id="addCreditDialog1" open={isAddCreditDialogOpen1}>

    <form onSubmit={() => saveCredit(document.getElementById("customerName/Id").value, document.getElementById("phoneNo").value, document.getElementById("Email").value, document.getElementById("InvoiceID").value, document.getElementById("amount").value)}>
            <h2>Add Credit</h2> {/* Heading */}
            {/* Render fields for new customer */}
              <>
                <label htmlFor="customerName">Customer Name/ID:</label>
                <input type="text" id="customerName" required="" />
                <br />
                <label htmlFor="phoneNo">Phone No.:</label>
                <input type="text" id="phoneNo" required="" />
                <br />
                <label htmlFor="Email">Email.:</label>
                <input type="text" id="Email" required="" />
                <br />
                <label htmlFor="InvoiceID">Invoice Id:</label>
      <input type="text" id="InvoiceID" required="" />
      <br />
                <label htmlFor="amount">Amount:</label>
                <input type="text" id="amount" required="" />
                <br />

              </>
              
            <button type="button" onClick={hideAddCreditDialog1}>
              Cancel
            </button>
            <button type="submit"  disabled={false}> {/* Button disabled by default form submission prevention */}
              {selectedCustomerType === 'new' ? 'Save' : 'Save'}
            </button>
          </form>
        </dialog>

              <dialog id="addCreditDialog2" open={isAddCreditDialogOpen2}>

<form onSubmit={() => saveCredit(document.getElementById("customerName/Id").value, document.getElementById("phoneNo").value, document.getElementById("Email").value, document.getElementById("InvoiceID").value, document.getElementById("amount").value)}>
        <h2>Add Credit</h2> {/* Heading */}
               <>
                <label htmlFor="customerName">Customer Name/ID:</label>
                <input type="text" id="customerName" required="" />
                <br />
               <label htmlFor="InvoiceID">Invoice Id:</label>
     <input type="text" id="InvoiceID" required="" />
     <br />
               <label htmlFor="amount">Amount:</label>
               <input type="text" id="amount" required="" />
               <br />

             </>

            <button type="button" onClick={hideAddCreditDialog2}>
              Cancel
            </button>
            <button type="submit"  disabled={false}> {/* Button disabled by default form submission prevention */}
             Update
            </button>
          </form>
        </dialog>
     
  
</div>

    )
}
export default PendingTransactions;

import React, { useState } from 'react';
import './Invoice.css';
import { Link } from "react-router-dom";
import AddRowDialog from './components/Invoice/AddRow';
import {initialState} from './components/Invoice/initialState';
import DeleteIcon from '@mui/icons-material/Delete';

const Invoice = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [invoiceData, setInvoiceData] = useState(initialState);
  const showAddNewItemDialog = () => {
    setShowDialog(true);
  };

  const hideAddNewItemDialog = () => {
    setShowDialog(false);
  };
  const handleInputChange = (event, index, fieldName) => {
    const { value } = event.target;
  
    // Create a copy of the itemList array
    const updatedItemList = [...invoiceData.itemList];
  
    // Update the corresponding field for the item at the specified index
    updatedItemList[index] = {
      ...updatedItemList[index],
      [fieldName]: value
    };
  
    // Update the state with the modified itemList array
    setInvoiceData({
      ...invoiceData,
      itemList: updatedItemList
    });
  };
  const handleAddField = (e) => {
    e.preventDefault()
    setInvoiceData((prevState) => ({...prevState, itemList: [...prevState.itemList,  {itemName: '', quantity:0, rate:0, discount:0,gst:0, amount:0}]}))
  }

  const handleDeleteRow = (index) => {
    setInvoiceData((prevData) => {
      const updatedItemList = [...prevData.itemList];
      updatedItemList.splice(index, 1);
      return {
        itemList: updatedItemList,
      };
    });
  };

    return (
    <div  className="Invoice">  
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
          <div>
    </div>
          {/* <table id="invoiceTable">
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
      </table> */}
    <div>
      <table id="invoiceTable">
        <thead>
          <tr class="headers">
            <th>ITEM DETAILS</th>
            <th>QUANTITY</th>
            <th>RATE</th>
            <th>DISCOUNT</th>
            <th>GST</th>
            <th>AMOUNT</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
        {invoiceData.itemList.map((item, index) => (
          <tr key={index}>
            <td><input type="text" value={item.itemName} onChange={(e) => handleInputChange(e, index, 'itemName')} /></td>
            <td><input type="number" value={item.quantity} onChange={(e) => handleInputChange(e, index, 'quantity')} /></td>
            <td><input type="number" value={item.rate} onChange={(e) => handleInputChange(e, index, 'rate')} /></td>
            <td><input type="number" value={item.discount} onChange={(e) => handleInputChange(e, index, 'discount')} /></td>
            <td><input type="number" value={item.gst} onChange={(e) => handleInputChange(e, index, 'gst')} /></td>
            <td><input type="number" value={item.amount} onChange={(e) => handleInputChange(e, index, 'amount')} /></td>
            <td>
                <DeleteIcon
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={() => handleDeleteRow(index)}
                />
              </td>
          </tr>
        ))}

        </tbody>
      </table>
      {/* <button id="add-new-item" type = "button" onClick={showAddNewItemDialog}> <strong> Add New Item </strong> </button> */}
      <button id="add-new-item" type = "button" onClick={handleAddField}> <strong> Add New Item </strong> </button>
      </div>
        
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
  </div>);
    
}


export default Invoice;




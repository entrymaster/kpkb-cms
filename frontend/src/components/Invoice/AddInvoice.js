import React, {useState} from 'react';
import './AddInvoice.css';
import {initialState} from './initialState';
import DeleteIcon from '@mui/icons-material/Delete';

const AddNewInvoice = () => {
    const [invoiceData, setInvoiceData] = useState(initialState);
  const handleInputChange = (event, index, fieldName) => {
    const { value } = event.target;
    const updatedItemList = [...invoiceData.itemList];
    updatedItemList[index] = {
      ...updatedItemList[index],
      [fieldName]: value
    };
    setInvoiceData({
      ...invoiceData,
      itemList: updatedItemList
    });
  };
  const handleInputChangeCust = (event, fieldName) => {
    const { value } = event.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [fieldName] : value,
    }));
  }
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

    const addInvoice = () => {
        fetch("http://localhost:5000/api/invoice/add", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(invoiceData),
        })
          .then((result) => {
            alert("Invoice ADDED");
            setInvoiceData(initialState);
            // handlePageUpdate();
            //addProductModalSetting();
            // onCancel();
          })
          .catch((err) => console.log(err));
      };
    
      return (
        <>
        {/* <div className="top">
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
          </div> */}
          <div className="customer-details">
            <table id="customerTable">
              <tbody>
                <tr>
                  <td className="input-box"><input type="text" value={invoiceData.customerName} onChange={(e) => handleInputChangeCust(e, 'customerName')} placeholder='Customer Name' /></td>
                  <td className="input-box">InvoiceID : {invoiceData.invoiceID}</td>
                </tr>
                <tr>
                  <td className="input-box"><input type="text" value={invoiceData.customerEmail} onChange={(e) => handleInputChangeCust(e, 'customerEmail')} placeholder='Customer Email' /></td>
                  <td className="input-box"><input type="text" value={invoiceData.phoneNo} onChange={(e) => handleInputChangeCust(e, 'phoneNo')} placeholder='Customer Phone No' /></td>
                </tr>
              </tbody>
            </table>
          </div>
        <div className="main-container">
        <div className='itemListContainer'>
      <table id="invoiceTable">
        <thead>
          <tr class="headers">
            <th>ITEM DETAILS</th>
            <th>QUANTITY</th>
            <th>RATE</th>
            <th>GST</th>
            <th>AMOUNT</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
        {invoiceData.itemList.map((item, index) => (
          <tr key={index}>
            <td><input type="text" value={item.itemName} onChange={(e) => handleInputChange(e, index, 'itemName')} placeholder='Item Name'/></td>
            <td><input type="number" value={item.quantity} onChange={(e) => handleInputChange(e, index, 'quantity')} /></td>
            <td><input type="number" value={item.rate} onChange={(e) => handleInputChange(e, index, 'rate')} /></td>
            {/* <td><input type="number" value={item.discount} onChange={(e) => handleInputChange(e, index, 'discount')} /></td> */}
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
        <button id="add-new-item" type = "button" onClick={handleAddField}> <strong> Add New Row </strong> </button>
        <button id="generate-bill-button" type = "button" onClick={addInvoice}> <strong> Generate Bill </strong> </button>
      </div>
      </div>
      </>
      )
}

export default AddNewInvoice
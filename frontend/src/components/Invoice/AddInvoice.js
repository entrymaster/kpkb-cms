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
            // handlePageUpdate();
            //addProductModalSetting();
            // onCancel();
          })
          .catch((err) => console.log(err));
      };
    
      return (
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
        <button id="add-new-item" type = "button" onClick={handleAddField}> <strong> Add New Row </strong> </button>
        <button id="generate-bill-button" type = "button" onClick={addInvoice}> <strong> Generate Bill </strong> </button>
      </div>
      )
}

export default AddNewInvoice
import React, {useEffect, useState} from 'react';
import './AddInvoice.css';
import {initialState} from './initialState';
import DeleteIcon from '@mui/icons-material/Delete';

const AddNewInvoice = () => {
  const [invoiceData, setInvoiceData] = useState(initialState);
  const [incInvoiceID, setIncInvoiceID] = useState(false);
  
  // const handleInputChange = (event, index, fieldName) => {
  //   const { value } = event.target;
  //   const updatedItemList = [...invoiceData.itemList];
  //   updatedItemList[index] = {
  //     ...updatedItemList[index],
  //     [fieldName]: value,
  //   };
  //   setInvoiceData({
  //     ...invoiceData,
  //     itemList: updatedItemList
  //   });
  // };
  const handleInputChange = (index, e) => {
    const values = [...invoiceData.itemList]
    values[index][e.target.name] = e.target.value
    setInvoiceData({...invoiceData, itemList: values})
  }
// const handleTotal = (index) => {
//   const updatedItemList = [...invoiceData.itemList];
//   const item = updatedItemList[index];
//     updatedItemList[index] = {
//       ...updatedItemList[index],
//       amount:(item.quantity * item.rate) + ((item.quantity * item.rate) * item.gst) / 100
//     };
//     setInvoiceData({
//       ...invoiceData,
//       itemList: updatedItemList
//     });
// }

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
      fetch("http://localhost:5050/api/invoice/add", {
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
        .then(()=>{
          setIncInvoiceID(true);
        })
        .catch((err) => console.log(err));
    };
    const getInvoiceCount = async() =>{
      fetch(`http://localhost:5050/api/invoice/count/${invoiceData.userID}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then(response => {
          if(!response.ok){
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data.count);
          setInvoiceData({...invoiceData, invoiceID: data.count})
        })
        .catch(error => {
          console.log('There was a problem with the fetch operation:', error);
        })
    }
    useEffect(() => {
      // if(incInvoiceID){
        getInvoiceCount(invoiceData.userID)
        .then(() => setIncInvoiceID(false))
      // }
      
    },[incInvoiceID, invoiceData.userID]);

    // useEffect(() => {
      
    //   setInvoiceData()
      
    // },[invoiceData.itemList,index]);

    return (
      <>
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
          <td><input type="text" value={item.itemName} name='itemName' onChange={(e) => handleInputChange(index, e)} placeholder='Item Name'/></td>
          <td><input type="number" value={item.quantity} name='quantity' onChange={(e) => handleInputChange(index, e)} placeholder='Quantity'/></td>
          <td><input type="number" value={item.rate} name='rate' onChange={(e) => handleInputChange(index, e)} placeholder='Price/unit'/></td>
          <td><input type="number" value={item.gst} name='gst' onChange={(e) => handleInputChange(index, e)} placeholder='GST (%)'/></td>
          <td><input type="number" value={(item.quantity * item.rate) + ((item.quantity * item.rate) * item.gst) / 100} name='amount' onChange={(e) => handleInputChange(index, e)} placeholder='Amount' disabled/>
          {/* <input
            type="hidden"
            value={(item.quantity * item.rate) + ((item.quantity * item.rate) * item.gst) / 100}
            name={itemList[${index}].amount}
          /> */}
          </td>
          {/* <td>{item.amount}</td> */}
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
      <table className='totalAmt'>
        <tr>
          <td>Discount: <input type="number" value={invoiceData.discount} onChange={(e) => handleInputChangeCust(e, 'discount')} placeholder='Discount (%)'/></td>
          <td className="total-amt-box">Total Amount: {invoiceData.totalAmount}</td>
        </tr>
      </table>
    </div>
    </div>
    </>
    )
}

export default AddNewInvoice
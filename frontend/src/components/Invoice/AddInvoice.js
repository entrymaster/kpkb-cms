import React, {useEffect, useState, useRef, useContext} from 'react';
import './AddInvoice.css';
import axios from 'axios';
import {initialState} from './initialState';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchableDropdown from './SearchableDropdown';
import ReactLoading from "react-loading";
import AuthContext from '../../AuthContext';
import { saveAs } from 'file-saver';
const AddNewInvoice = () => {
  const [invoiceData, setInvoiceData] = useState(initialState);
  const [incInvoiceID, setIncInvoiceID] = useState(false);
  const [totalChange, setTotalChange] = useState(false);
  const [items, setAllItems] = useState([]);
  const [currItem, setCurrItem] = useState();
  const [updatePage, setUpdatePage] = useState(true);
  const [isPaid, setIsPaid] = useState(true);
  const [availableQuantity, setAvailableQuantity] = useState(1000000000000000);
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState({firstname: '', lastname: '', email: '', password: '', gstno: '', shopname: '', shopaddress: ''}); 

  const handleItemSelection = (selectedItem) => {
    // Assuming selectedItem is an object containing the selected item details including available quantity
    setAvailableQuantity(selectedItem.quantity);
  };

  const handleInputChange = async(event, index, fieldName) => {
    const { value } = event.target;
    if(value != null){
      const updatedItemList = [...invoiceData.itemList];
      if(fieldName==='itemName'){
        updatedItemList[index].itemName = value['itemName'];
        updatedItemList[index].costPrice = value['costPrice'];
        updatedItemList[index].rate=value['salePrice'];
        updatedItemList[index].gst=value['itemGST'];
        updatedItemList[index]._id=value['_id'];
        handleItemSelection(value);
        let quantity = parseFloat(updatedItemList[index].quantity);
        if(quantity > value['quantity']) {
          alert("Quantity entered exceeds available stock !");
          updatedItemList[index].quantity = 0;
          quantity = 0;
        };
        const rate = parseFloat(updatedItemList[index].rate);
        const gst = parseFloat(updatedItemList[index].gst);
        const amount = (quantity * rate) + ((quantity * rate) * gst) / 100;
        updatedItemList[index].amount = amount;
      }
      if (fieldName === 'quantity') {
        let quantity = parseFloat(value);
        if(quantity > availableQuantity) {
          alert("Quantity entered exceeds available stock !");
          updatedItemList[index].quantity = 0;
          quantity = 0;
        };
        const rate = parseFloat(updatedItemList[index].rate);
        const gst = parseFloat(updatedItemList[index].gst);
        const amount = (quantity * rate) + ((quantity * rate) * gst) / 100;
        updatedItemList[index].amount = isNaN(amount) ? 0 : amount;
        updatedItemList[index].quantity = quantity;
      }
  
      setInvoiceData({
        ...invoiceData,
        itemList: updatedItemList
      });
    }
    setTotalChange(true);
      
  };

  const handleInputChangeCust = async(event, fieldName) => {
    const { value } = event.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [fieldName] : value,
    }));
    setTotalChange(true);
  };

  useEffect(()=>{
    const arr = invoiceData.itemList;
    var subTotal = 0;
    for(var i=0; i<arr.length; i++){
      subTotal = subTotal + arr[i].amount;
    }
    invoiceData.totalAmount = subTotal - (subTotal*invoiceData.discount)/100;
    invoiceData.totalAmount = (isNaN(invoiceData.totalAmount)) ? 0 : invoiceData.totalAmount;
    setTotalChange(false);
  }, [totalChange])

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
    if (invoiceData.paymentMode === 'Credit') {
      // If payment mode is Credit, add invoice data to pending transactions
      addPendingTransaction();
    }
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
          setCurrItem(null);
        })
        .then(() => {
          setIncInvoiceID(true);
          window.location.reload(); 
        })
        .catch((err) => console.log(err));

        setUpdatePage(false);
    };

    const getUserData = () => {
      return new Promise((resolve, reject) => {
        console.log(authContext.user);
        fetch(`http://localhost:5050/api/user/get/${authContext.user}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        })
       
        .then(response => {
          console.log(response);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // console.log(data);
          // setUserData(data);
          userData.firstname = data.firstname;
          userData.lastname = data.lastname;
          userData.email = data.email;
          userData.password = data.password;
          userData.gstno = data.gstno;
          userData.shopname = data.shopname;
          userData.shopaddress = data.shopaddress;
          resolve(data); // Resolve the promise with the user data
        })
        .catch(error => {
          console.log('There was a problem with the fetch operation:', error);
          reject(error); // Reject the promise with the error
        });
      });
    }
    
    const createPdf = () => {
      getUserData()
        .then(() => {
          // userData will be available here as getUserData() has completed execution
          // console.log(userData);
          
          const requestData = {
            invoiceData: invoiceData,
            userData: userData
          };
          console.log(requestData);
        
          // Send the combined data in the request body
          return axios.post('http://localhost:5050/api/create-pdf', requestData);
        })
        .then(() => axios.get('http://localhost:5050/api/fetch-pdf', { responseType: 'blob'}))
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
          const pdfUrl = URL.createObjectURL(pdfBlob);
          window.open(pdfUrl,'_blank');
        })
        .catch((error) => {
          console.error('Error creating PDF:', error);
        });
    }
    
    const downloadPdf = () => {
      getUserData()
        .then(() => {
          // userData will be available here as getUserData() has completed execution
          // console.log(userData);
          
          const requestData = {
            invoiceData: invoiceData,
            userData: userData
          };
          console.log(requestData);
          return requestData;
        })
        .then((requestData) => {
          // console.log(requestData)
      axios.post('http://localhost:5050/api/create-pdf', requestData)
      .then(() => axios.get('http://localhost:5050/api/fetch-pdf', { responseType: 'blob'}))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, `invoice_${invoiceData.invoiceID}.pdf`);
      })
        })
    }

    const updateInventory = () => {
      fetch("http://localhost:5050/api/inventory/updateItemQuantity",{
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(invoiceData.itemList),
      })
      .then(() => {
        setUpdatePage(false);
        // window.location.reload(); // Reload the webpage
      })

    }

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
          // console.log(data.count);
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

    useEffect(() => {
      fetchItemsData();
      // fetchSalesData();
    }, [updatePage]);
    const userId='user';

    const fetchItemsData = () => {
      fetch(`http://localhost:5050/api/inventory/get/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setAllItems(data);
      })
      .catch((err) => console.log(err));
    };

    const addPendingTransaction = () => {
      const pendingTransactionData = {
        partyName: invoiceData.customerName,
        phoneNumber: invoiceData.phoneNo,
        email: invoiceData.customerEmail,
        amount: invoiceData.totalAmount // You might need to adjust this based on your application logic
      };
    
      fetch("http://localhost:5050/api/pendingTransactions/add", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(pendingTransactionData),
      })
      .then((result) => {
        console.log("Pending Transaction ADDED");
      })
      .catch((err) => console.log(err));
    };
    

    const togglePaymentMode = () => {
      setInvoiceData(prevData => ({
        ...prevData,
        paymentMode: isPaid ? 'Credit' : 'Paid'
      }));
      setIsPaid(prevState => !prevState);
    };

    return (
      <>
      {/* {isLoading && (
        <div className="loading-overlay">
          <ReactLoading type="spinningBubbles" color="#0000FF"
                height={100}
                width={50}/>
        </div>
      )} */}
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
          <th>Item Details</th>
          <th>Quantity</th>
          <th>Price (per unit)</th>
          <th>GST (%)</th>
          <th>Amount (&#8377;)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {invoiceData.itemList.map((item, index) => (
        <tr key={index}>
          <td placeholder='Select Item'>
            <SearchableDropdown
              options={items}
              label="itemName"
              id={`dropdown-${index}`}
              selectedVal={currItem}
              handleChange={(selectedItem) => handleInputChange({ target:{ value: selectedItem } }, index, 'itemName')} 
            /></td>
          <td><input type="number" value={item.quantity} onChange={(e) => handleInputChange(e, index, 'quantity')} placeholder='Quantity'/></td>
          <td>{item.rate}</td>
          <td>{item.gst}</td>
          <td>{item.amount}</td>

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
      <div className="bottom-controls">
        <button id="add-new-item" type="button" onClick={handleAddField}> <strong> Add New Row </strong> </button>
        <div className='discount-input'>
          Discount (%): <input type="number" value={invoiceData.discount} onChange={(e) => handleInputChangeCust(e, 'discount')} placeholder='Discount (%)'/>
        </div>
      </div>
      <div className="customer-notes">
        <label htmlFor="customerNotes">Customer Notes:</label><br />
        <textarea id="customerNotes" value={invoiceData.notes} onChange={(e) => handleInputChangeCust(e, 'notes')} placeholder="Enter notes here..." rows="4" cols="50"></textarea>
      </div>
      <div className="total-amt-box" style={{ fontSize: '24px' }}>Total Amount: &#8377; {invoiceData.totalAmount}</div>
    </div>
      <div className="bill-buttons">
        <button id="add-as-credit" type = "button" onClick={togglePaymentMode}> <strong> {isPaid ? 'Add as Credit' : 'Set as Paid'} </strong> </button>
        <button id="preview-bill" type = "button" onClick={createPdf}> <strong> Preview Bill </strong> </button>
        <button id="generate-bill-button" type = "button"  onClick={() => {addInvoice(); updateInventory(); downloadPdf();}}> <strong> Generate Bill </strong> </button>
      </div>
    
    </div>
    </>
    )
}

export default AddNewInvoice;
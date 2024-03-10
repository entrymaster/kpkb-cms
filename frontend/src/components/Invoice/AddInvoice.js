import React, {useEffect, useState, useRef, useContext} from 'react';
import './AddInvoice.css';
import axios from 'axios';
import {initialState} from './initialState';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchableDropdown from './SearchableDropdown';
import AuthContext from '../../AuthContext';

const AddNewInvoice = () => {
  // const reload = () => {window.location.reload()};
  // reload();
  const [invoiceData, setInvoiceData] = useState(initialState);
  const [incInvoiceID, setIncInvoiceID] = useState(false);
  const [totalChange, setTotalChange] = useState(false);
  const [items, setAllItems] = useState([]);
  const [currItem, setCurrItem] = useState();
  const [updatePage, setUpdatePage] = useState(true);
  // const history = useHistory();
  const authContext = useContext(AuthContext);

  const handleInputChange = async(event, index, fieldName) => {
    const { value } = event.target;
      // console.log(value)
      const updatedItemList = [...invoiceData.itemList];
      // console.log(value['itemName'])
      if(fieldName==='itemName'){
        updatedItemList[index].itemName = value['itemName'];
        updatedItemList[index].rate=value['salePrice'];
        updatedItemList[index].gst=value['itemGST'];
        updatedItemList[index]._id=value['_id'];
      }
    if (fieldName === 'quantity') {
      const quantity = parseFloat(value)
      const rate = parseFloat(updatedItemList[index].rate);
      const gst = parseFloat(updatedItemList[index].gst);
      const amount = (quantity * rate) + ((quantity * rate) * gst) / 100;
      updatedItemList[index].amount = amount;
      updatedItemList[index].quantity = quantity;
    }
  
    setInvoiceData({
      ...invoiceData,
      itemList: updatedItemList
    });
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
    setTotalChange(false);
  }, [totalChange])

  const handleAddField = (e) => {
    e.preventDefault()
    setInvoiceData((prevState) => ({...prevState, itemList: [...prevState.itemList,  {itemName: '', quantity:0, rate:0, discount:0,gst:0, amount:0}]}))
    // setCurrItem();
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
          console.log(invoiceData);
          alert("Invoice ADDED");
          setInvoiceData(initialState);
        })
        .then(() => {
          setIncInvoiceID(true);
          // window.location.reload(); // Reload the webpage
        })
        .catch((err) => console.log(err));

        setUpdatePage(false);
    };

    const handleGeneratePDF = async () => {
      try {
        // console.log(invoiceData);
        const response = await axios.post('http://localhost:5050/api/invoice/generate-pdf', 
        {invoiceData}, { responseType: 'blob' });
  
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
  
        // Open the PDF in a new window
        const newWindow=window.open();
        newWindow.location.href = pdfUrl;
        // window.open(pdfUrl, '_blank');
      } catch (error) {
        console.error(error);
      }
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

    const handleOpenPDF = () => {
      window.open(`/pdf-viewer/?data=${encodeURIComponent(JSON.stringify(invoiceData))}`, '_blank'); // Open the PDFViewer component in a new window
    };
    // const handleOpenPDF = () => {
    //   // Navigate to the PDF viewer page with the invoiceData as a query parameter
    //   history.push({
    //     pathname: '/invoice/pdf-viewer',
    //     search: `?data=${encodeURIComponent(JSON.stringify(invoiceData))}`,
    //   });
    // };

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
              handleChange={(selectedItem) => handleInputChange({ target: { value: selectedItem } }, index, 'itemName')} 
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
        <button id="add-as-credit" type = "button" onClick={handleAddField}> <strong> Add as Credit </strong> </button>
        <button id="preview-bill" type = "button" onClick={ handleGeneratePDF}> <strong> Preview Bill </strong> </button>
        <button id="generate-bill-button" type = "button"  onClick={() => {addInvoice(); updateInventory();}}> <strong> Generate Bill </strong> </button>
      </div>
    
    </div>
    </>
    )
}

export default AddNewInvoice;
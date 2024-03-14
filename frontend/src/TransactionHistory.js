import React,{useState, useEffect,useContext} from 'react';
import './TransactionHistory.css';
import { Link } from "react-router-dom";
import AuthContext from './AuthContext';
import axios from 'axios';
import {initialState} from './components/Invoice/initialState';


const TransactionHistory = () =>
{
  const [updatePage, setUpdatePage] = useState(true);
  const [transactions, setAllTransactions] = useState([]);
  const [customerName, setCustomerName] = useState();
  // const [products, setAllProducts] = useState([]);
  const authContext = useContext(AuthContext);
  const [invoiceData, setInvoiceData] = useState(initialState);


  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };
  useEffect(() => {
    fetchTransactionData();
    // fetchSalesData();
  }, [updatePage]);

  const userId="user";
  const fetchTransactionData = () => {
    fetch('http://localhost:5050/api/invoice/get/${userId}')
    // fetch(`http://localhost:5050/api/inventory/get/${authContext.user}`)
    .then((response) => response.json())
    .then((data) => {
      setAllTransactions(data);
      console.log("Successfull");
      console.log(data);
    })
    .catch((err) => console.log(err));
   
};
const fetchSearchData = () => {
  fetch(`http://localhost:5050/api/invoice/search/${userId}?customerName=${customerName}`)
    .then((response) => response.json())
    .then((data) => {
      setAllTransactions(data);
      console.log(data);
     
    })
    .catch((err) => console.log(err));
};
const createPdf = () => {
  axios.post('http://localhost:5050/api/create-pdf', invoiceData)
    .then(() => axios.get('http://localhost:5050/api/fetch-pdf', { responseType: 'blob' }))
    .then((res) => {
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    });
};
const handleCustomerName = async (e) => {
  await setCustomerName(e.target.value);
  fetchSearchData();
};
// const populateInvoiceData = async (element) => {
//   await setInvoiceData(element);
//   createPdf();
// };
const populateInvoiceData = (element) => {
  setInvoiceData(element);
};

useEffect(() => {
  if (invoiceData) {
    createPdf();
  }
}, [invoiceData]);
    return (
      <div className="TransactionHistory">
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
              <Link to="/dashboard" style={{color: "white",  textDecoration: 'none'}}>Dashboard</Link>
              </p>
              <p>
              <Link to="/invoice" style={{color: "white", textDecoration: 'none'}}>Invoice</Link>
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
              <p style={{ backgroundColor: "#E0E0F7" }}>
              <Link to="/TransactionHistory" style={{color: "black", textDecoration: 'none'}}>Transaction History</Link>
              </p>
              <p>
          <Link to="/Reports" style={{color: "white", textDecoration: 'none'}}>Reports</Link> 
          </p>
          </div>
        </div>
      </div>
      <div className="top-panel">
        <div style={{ textAlign: "left", marginTop: 15 }}>
          <h1 style={{ color: "#fff", fontSize: 40 }}>Transaction History</h1>
        </div>
      </div>
      <div className="main-container">
        <div className="add-button-container">
        </div>
        <div className="top">
          <div className="search-bar-container">
            <input type="text" className="search-bar" placeholder="Search"
            value={customerName}
            onChange={handleCustomerName}
            />
            <div className="search-icon">🔍</div>
            {/* <div className="circle" /> */}
          </div>
        </div>
        <table id="inventoryTable">
            <thead>
              <tr class="headers">
              <th>DATE</th>
                <th>CUSTOMER NAME</th>
                <th>TYPE</th>
                <th>AMOUNT</th>
                <th>INVOICE ID</th>
              </tr>
            </thead>
            <tbody>
        {transactions && transactions.map((element, index) => {
          return (
            <tr key={element._id}>
              <td>{element.createdAt}</td>
              <td>{element.customerName}</td>
              <td>{element.paymentMode}</td>
              <td>{element.totalAmount}</td>
              {/* <td>{element.invoiceID }</td> */}
              <td>
              <span
              className="action-button"
                //className="text-green-700 cursor-pointer"
                //onClick={() => updateProductModalSetting(element)}
                onClick={() => populateInvoiceData(element)}
              >
                {element.invoiceID + " "}
              </span>
              </td>
            </tr>
          );
        })}
      </tbody>
          </table>
      </div>
    </div>
      );
}

export default TransactionHistory;// main inventory.js


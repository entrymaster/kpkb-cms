import React, { useState, useEffect, useContext } from 'react';
import './TransactionHistory.css';
import { Link } from "react-router-dom";
import AuthContext from './AuthContext';
import axios from 'axios';
import { initialState } from './components/Invoice/initialState';
import Navbar from './Navbar';
import { saveAs } from 'file-saver';
import SearchIcon from '@mui/icons-material/Search'; // Import Search icon from Material-UI


const TransactionHistory = () => {
  const [updatePage, setUpdatePage] = useState(true);
  const [transactions, setAllTransactions] = useState([]);
  const [customerName, setCustomerName] = useState();
  const authContext = useContext(AuthContext);
  const [invoiceData, setInvoiceData] = useState(initialState);
  const [userData, setUserData] = useState({ firstname: '', lastname: '', email: '', password: '', gstno: '', shopname: '', shopaddress: '' });
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.customerName.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  useEffect(() => {
    fetchTransactionData();
    setInvoiceData((prevState) => ({...prevState,userID:authContext.user }))
  }, [updatePage]);

  //const userId = "user";
  const userId = authContext.user;

  const fetchTransactionData = () => {
    fetch(`http://localhost:5050/api/invoice/get/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setAllTransactions(data);
      })
      .catch((err) => console.log(err));
  };

  const fetchSearchData = () => {
    fetch(`http://localhost:5050/api/invoice/search/${userId}?customerName=${customerName}`)
      .then((response) => response.json())
      .then((data) => {
        setAllTransactions(data);
      })
      .catch((err) => console.log(err));
  };

  const getUserData = () => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:5050/api/user/get/${authContext.user}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {
          userData.firstname = data.firstname;
          userData.lastname = data.lastname;
          userData.email = data.email;
          userData.password = data.password;
          userData.gstno = data.gstno;
          userData.shopname = data.shopname;
          userData.shopaddress = data.shopaddress;
          resolve(data);
        })
        .catch(error => {
          console.log('There was a problem with the fetch operation:', error);
          reject(error);
        });
        console.log(userData);
    });
  };

  const createPdf = () => {
    getUserData()
      .then(() => {
        const requestData = {
          invoiceData: invoiceData,
          userData: userData
        };
        console.log(userData);
        return axios.post('http://localhost:5050/api/create-pdf', requestData);
      })
      .then(() => axios.get('http://localhost:5050/api/fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
        console.log("jdj");
      })
      .catch((error) => {
        console.error('Error creating PDF:', error);
      });
  };
  const handleCustomerName = async (e) => {
    await setCustomerName(e.target.value);
    fetchSearchData();
  };

  const populateInvoiceData = (element) => {
    invoiceData.userID = authContext.user;
    invoiceData.invoiceID = element.invoiceID;
    invoiceData.customerName = element.customerName;
    invoiceData.phoneNo = element.phoneNo;
    invoiceData.customerEmail = element.customerEmail;
    invoiceData.totalAmount = element.totalAmount;
    invoiceData.notes = element.notes;
    invoiceData.paymentMode = element.paymentMode;
    invoiceData.discount = element.discount;
    invoiceData.itemList = element.itemList;
    invoiceData.createdAt = element.createdAt;
    // setInvoiceData(element);
    // console.log(element);
    console.log(invoiceData);
     createPdf(); // Remove calling createPdf here
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="TransactionHistory">
      <Navbar />
      <div className="main-container">
        <div className="top">
          <div className="search-bar-container">
            <input type="text" className="search-bar" placeholder="Search"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            <SearchIcon className="search-icon" /> {/* Use Search icon from Material-UI */}
          </div>
        </div>
        <table id="inventoryTable">
          <thead>
            <tr className="headers">
              <th>DATE</th>
              <th>CUSTOMER NAME</th>
              <th>TYPE</th>
              <th>AMOUNT</th>
              <th>INVOICE ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((element, index) => (
            // {transactions && transactions.map((element, index) => {
            //   return (
                <tr key={element._id}>
                  <td>{formatDate(element.createdAt)}</td>
                  <td>{element.customerName}</td>
                  <td>{element.paymentMode}</td>
                  <td>{element.totalAmount}</td>
                  <td>
                    <span
                      className="action-button"
                      onClick={() => populateInvoiceData(element)}
                    >
                      {element.invoiceID + " "}
                    </span>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionHistory;


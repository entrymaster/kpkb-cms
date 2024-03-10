import React,{useState, useEffect,useContext} from 'react';
import './TransactionHistory.css';
import { Link } from "react-router-dom";
import AuthContext from './AuthContext';

const TransactionHistory = () =>
{
  const [updatePage, setUpdatePage] = useState(true);
  const [transactions, setAllTransactions] = useState([]);
  const authContext = useContext(AuthContext);


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
// const fetchSearchData = () => {
//   fetch('http://localhost:5050/api/inventory/search/${userId}?itemName=${itemName}')
//     .then((response) => response.json())
//     .then((data) => {
//       setAllProducts(data);
//     })
//     .catch((err) => console.log(err));
// };
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
              <Link to="/" style={{color: "white",  textDecoration: 'none'}}>Dashboard</Link>
              </p>
              <p>
              <Link to="/invoice" style={{color: "white", textDecoration: 'none'}}>Invoice</Link>
              </p>
              <p style={{ backgroundColor: "#E0E0F7" }}>
              <Link to="/inventory" style={{color: "black", textDecoration: 'none'}}>Inventory</Link>
              </p>
              <p>
              <Link to="/pendingTransactions" style={{color: "white", textDecoration: 'none'}}>Pending Transactions</Link>
              </p>
              <p>
              <Link to="/contactUs" style={{color: "white", textDecoration: 'none'}}>Contact Us</Link>
              </p>
              <p>
              <Link to="/Register" style={{color: "white", textDecoration: 'none'}}>Register</Link>
              </p>
              <p>
              <Link to="/TransactionHistory" style={{color: "white", textDecoration: 'none'}}>Transaction History</Link>
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
            // value={itemName}
            // onChange={handleItemName}
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
              <td>{element.invoiceID }</td>
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


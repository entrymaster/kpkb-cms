import React,{useState,useEffect, useContext} from 'react';
import './Dashboard.css';
import { Link, useNavigate } from "react-router-dom";
import { performSignout } from './auth';
import Navbar from './Navbar';
import AuthContext from './AuthContext';
function Dashboard() { 
  // const navigate = useNavigate();

  // const handleSignout = () => {
  //   performSignout(navigate);
  // };
  const authContext = useContext(AuthContext);
  const [updatePage, setUpdatePage] = useState(true);
  const [todayProfit, setTodayProfit] = useState('');
  const [todaySales, setTodaySales] = useState('');
  const [todayBills, setTodayBills] = useState('');
  const [yesterdaySales, setYesterdaySales] = useState('');
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };
  useEffect(() => {
    //fetchUserData();
    fetchDashboardData();
  }, [updatePage]);
  const fetchDashboardData = () => {
    //fetch(`http://localhost:5050/api/invoice/getDashboardData/${authContext.user}`)
    fetch(`http://localhost:5050/api/invoice/getDashboardData/${authContext.user}`)
    .then((response) => response.json())
    .then((data) => {
      // setAllProducts(data);
      setTodayProfit(data.totalSellingPrice-data.totalCostPrice);
      setTodaySales(data.totalSellingPrice);
      setTodayBills(data.numberOfInvoices);
      setYesterdaySales(data.totalSellingPriceYesterday)
      console.log(data);
    })
    .catch((err) => console.log(err));
};
  return (
  <div className="Dashboard">
     <Navbar/>
    {/* <div className="container">
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
          <p style={{ backgroundColor: "#E0E0F7" }}>
          <Link to="/" style={{color: "black",  textDecoration: 'none'}}>Dashboard</Link>
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
          <p>
          <Link to="/TransactionHistory" style={{color: "white", textDecoration: 'none'}}>Transaction History</Link>
          </p>
          <p>
          <Link to="/Reports" style={{color: "white", textDecoration: 'none'}}>Reports</Link> 
          </p>
        </div>
      </div>
    </div> */}
    <div
      // className="top-panel"
      // style={{ display: "flex", justifyContent: "left", alignItems: "end" }}
    >
      {/* <span
        style={{
          paddingInlineStart: "0.2cm",
          color: "white",
          fontSize: "1cm",
          fontFamily: '"Times New Roman"'
        }}
      >
        {" "}
        Dashboard
      </span> */}
      {/* <div>
          <button id="signOutBtn" onClick = {handleSignout}>Sign Out</button>
      </div> */}
    </div>
    <div
      className="main-container"
      style={{ display: "flex", justifyContent: "space-around", paddingTop: 120 }}
    >
      <div className="data-box">
        <p
          style={{
            fontSize: "x-large",
            fontFamily: '"Times New Roman", Times, serif'
          }}
        >
          Today's Sales 
          <br />₹ {todaySales}
        </p>
      </div>
      <div className="data-box">
        <p
          style={{
            fontSize: "x-large",
            fontFamily: '"Times New Roman", Times, serif'
          }}
        >
          Today's Profit
          <br />₹ {todayProfit}
        </p>
      </div>
      <div className="data-box">
        <p
          style={{
            fontSize: "x-large",
            fontFamily: '"Times New Roman", Times, serif'
          }}
        >
          Today's Bills
          <br />
          {todayBills}
        </p>
      </div>
      <div className="data-box">
        <p
          style={{
            fontSize: "x-large",
            fontFamily: '"Times New Roman", Times, serif'
          }}
        >
          Yesterday's Sales
          <br />₹ {yesterdaySales}
        </p>
      </div>


























    </div>
  </div>
  )
    }
export default Dashboard;

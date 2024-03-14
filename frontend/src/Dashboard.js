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
    fetch(`http://localhost:5050/api/invoice/getDashboardData/${authContext.user}`)
    .then((response) => response.json())
    .then((data) => {
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

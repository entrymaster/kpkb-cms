import React from 'react';
import './Dashboard.css';
import { Link } from "react-router-dom";
import Navbar from './Navbar'; // Assuming Navbar component is imported from './Navbar'

function FAQ() { 
  return (
    <>
      <Navbar />
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
              <Link to="/" style={{ color: "black", textDecoration: 'none' }}>Dashboard</Link>
            </p>
            <p>
              <Link to="/invoice" style={{ color: "white", textDecoration: 'none' }}>Invoice</Link>
            </p>
            <p>
              <Link to="/inventory" style={{ color: "white", textDecoration: 'none' }}>Inventory</Link>
            </p>
            <p>
              <Link to="/pendingTransactions" style={{ color: "white", textDecoration: 'none' }}>Pending Transactions</Link>
            </p>
            <p>
              <Link to="/contactUs" style={{ color: "white", textDecoration: 'none' }}>Contact Us</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="top-panel" style={{ display: "flex", justifyContent: "left", alignItems: "end" }}>
        <span style={{ paddingInlineStart: "0.2cm", color: "white", fontSize: "1cm", fontFamily: '"Times New Roman"' }}>FAQs</span> */}
      {/* </div> */}
      <div className="main-container" style={{ display: "flex", justifyContent: "space-around", paddingTop: 20 }}>
        {/* FAQ Sections */}
        <div>
          <p><strong>Q. How to change my password?</strong></p>
          <p><strong>A. Click on the settings icon in the top right corner. Then select the "Change Password" option from the dropdown menu. An OTP will be sent to your registered Email ID. Enter this OTP and create a new password.</strong></p>
        </div>
        <div>
          <p><strong>Q. How to edit my profile?</strong></p>
          <p><strong>A. Click on the Profile icon in the top right corner to open your profile page. Click on the ‘Edit Profile’ button, make all the changes, then click ‘Save Profile’ button to save the changes.</strong></p>
        </div>
        <div>
          <p><strong>Q. How to switch OFF/ON the notifications?</strong></p>
          <p><strong>A. Click on the settings icon in the top right corner. Then click on the ON/OFF toggle button in front of the Notifications option in the dropdown menu.</strong></p>
        </div>
        <div>
          <p><strong>Q. How do I search items in the inventory?</strong></p>
          <p><strong>A. Type the name of the item in the search box to search for it. You can also search by applying various filters using the filters icon.</strong></p>
        </div>
        <div>
          <p><strong>Q. What is meant by Preview Bill on the Invoice Tab?</strong></p>
          <p><strong>A. ‘Preview Bill’ button can be used to preview a draft of the Invoice before printing.</strong></p>
        </div>
        <div>
          <p><strong>Q. What to do in case of any problem with the software?</strong></p>
          <p><strong>A. You can report your issues via email provided on our ‘Contact Us’ page.</strong></p>
        </div>
      </div>
    </>
  );
}

export default FAQ;

import React from 'react';
import './Dashboard.css';
import { Link } from "react-router-dom";
import Navbar from './Navbar'; // Assuming Navbar component is imported from './Navbar'
import './FAQ.css';
function FAQ() { 
  return (
    <>
      <Navbar />
      <div className="faq-container">
      <div className="faq-section">
        <p className="question"><strong>Q. How to change my password?</strong></p>
        <p className="answer">A. Click on the settings icon in the top right corner. Then select the "Change Password" option from the dropdown menu. An OTP will be sent to your registered Email ID. Enter this OTP and create a new password.</p>
      </div>
      <div className="faq-section">
        <p className="question"><strong>Q. How to edit my profile?</strong></p>
        <p className="answer">A. Click on the Profile icon in the top right corner to open your profile page. Click on the ‘Edit Profile’ button, make all the changes, then click ‘Save Profile’ button to save the changes.</p>
      </div>
      <div className="faq-section">
        <p className="question"><strong>Q. How to switch OFF/ON the notifications?</strong></p>
        <p className="answer">A. Click on the settings icon in the top right corner. Then click on the ON/OFF toggle button in front of the Notifications option in the dropdown menu.</p>
      </div>
      <div className="faq-section">
        <p className="question"><strong>Q. How do I search items in the inventory?</strong></p>
        <p className="answer">A. Type the name of the item in the search box to search for it. You can also search by applying various filters using the filters icon.</p>
      </div>
      <div className="faq-section">
        <p className="question"><strong>Q. What is meant by Preview Bill on the Invoice Tab?</strong></p>
        <p className="answer">A. ‘Preview Bill’ button can be used to preview a draft of the Invoice before printing.</p>
      </div>
      <div className="faq-section">
        <p className="question"><strong>Q. What to do in case of any problem with the software?</strong></p>
        <p className="answer">A. You can report your issues via email provided on our ‘Contact Us’ page.</p>
      </div>
    </div>
    </>
  );
}

export default FAQ;

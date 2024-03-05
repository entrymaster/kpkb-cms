
import React from 'react';

const ContactUs = () => {
    return <div> <div className="container">
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
        {/* <h2>Navigation</h2> */}
        <a href=" /dashboard.js" className="nav-link">
          Dashboard
        </a>
        <a href="/dashboard.js" className="nav-link">
          Invoice
        </a>
        <a href="/dashboard.js" className="nav-link">
          Inventory
        </a>
        <a href="/dashboard.js" className="nav-link">
          Pending Transactions
        </a>
        <a href="/dashboard.js" className="nav-link">
          Transaction History
        </a>
        <a href="/dashboard.js" className="nav-link">
          Reports
        </a>
        <a href="/dashboard.js" className="nav-link">
          FAQs
        </a>
        <div style={{ backgroundColor: "#E0E0F7" }}>
          <a
            href=" /dashboard.html"
            className="nav-link"
            style={{ color: "black" }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  </div>
  <div
    className="top-panel"
    style={{ display: "flex", justifyContent: "left", alignItems: "end" }}
  >
    <span
      style={{
        paddingInlineStart: "0.2cm",
        color: "white",
        fontSize: "1cm",
        fontFamily: '"Times New Roman"'
      }}
    >
      {" "}
      Contact Us
    </span>
  </div>
  <div className="main-container">
    <div className="contact-section">
      <h2>&nbsp; GET IN TOUCH</h2>
      <div className="contact-info">
        <p>
          &nbsp; Got a question or need help? We're happy to hear from you!
          <br />
          <br />
          &nbsp; Kindly refer to the FAQs page for any general queries.
        </p>
        <div className="contact-details">
          <h3>
            &nbsp; <u>Contact Details</u>
          </h3>
          &nbsp; Mail us : &nbsp; <i className="fa fa-envelope" />
           billing360iitk@gmail.com 
          <br />
          <br />
          &nbsp; Call us : &nbsp; <i className="fa fa-phone" />
           +91 xxxxxxxxx
          <br />
          <br />
          &nbsp; Address : &nbsp;
          <i className="fa fa-map-marker-alt" /> Billing 360
          <br />
          &nbsp; &nbsp; &nbsp;      RM Building, IIT Kanpur
          <br />
          &nbsp; &nbsp; &nbsp;      Kanpur, Uttar Pradesh 208016
        </div>
        <div className="form-group">
          <form onsubmit="SendEmail(); reset(); return false;">
            <h2>
              &nbsp; <u>Message Us</u>
            </h2>
            <label htmlFor="name"> &nbsp; Name : &nbsp; &nbsp; </label>
            <input
              type="text"
              id="Name"
              className="textbox"
              size="45%"
              height={50}
              placeholder="  Your Name "
              required=""
            />
            <br />
            <br />
            <label htmlFor="email"> &nbsp; Email : &nbsp; &nbsp;</label>
            <input
              type="email"
              id="email"
              className="textbox"
              size="45%"
              height={50}
              placeholder=" Your Email Id "
              required=""
            />
            <br />
            <br />
            <label htmlFor="message"> &nbsp; Message :</label>
            <textarea
              rows={5}
              cols={42}
              placeholder=" How can we help you? "
              required=""
              defaultValue={""}
            />
          </form>
        </div>
        <br />
        <button type="submit" className="pushable">
          <span className="front"> Send Message </span>
        </button>
      </div>
    </div>
  </div></div>;
}

export default ContactUs;




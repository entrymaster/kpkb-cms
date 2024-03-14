import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./ContactUs.css"; 
const ContactUs = () => {
  return (
    <div className="ContactUs">
      <Navbar />
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
              &nbsp; &nbsp; &nbsp;RM Building, IIT Kanpur
              <br />
              &nbsp; &nbsp; &nbsp;Kanpur, Uttar Pradesh 208016
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
      </div>
    </div>
  );
};

export default ContactUs;

import React from "react";
import "./ContactUs.css"; // Make sure to import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Navbar from "./Navbar";
const ContactUs = () => {
  return (
   
    
    <div className="container">
      <Navbar/>
      <div className="content">
        <div className="left-side">
          <div className="address details">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <div className="topic">Address</div>
            <div className="text-one"> Billing 360</div>
            <div className="text-two">KD Lab, IIT Kanpur <br />
                Kanpur, Uttar Pradesh 208016</div>
          </div>
          <div className="phone details">
            <FontAwesomeIcon icon={faPhoneAlt} />
            <div className="topic">Phone</div>
            <div className="text-one">xxxxxxxxxx</div>
            {/* <div className="text-two">+0096 3434 5678</div> */}
          </div>
          <div className="email details">
            <FontAwesomeIcon icon={faEnvelope} />
            <div className="topic">Email</div>
            <div className="text-one">billing360iitk@gmail.com</div>
            {/* <div className="text-two">info.codinglab@gmail.com</div> */}
          </div>
        </div>
        <div className="right-side">
          <div className="topic-text">Send us a message</div>
          <p>Got a question or need help? We're happy to hear from you!. Kindly refer to the FAQs page for any general queries.</p>
          <p>How can we help you?</p>
          <form action="#">
            <div className="input-box">
              <input type="text" placeholder="Enter your name" />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Enter your email" />
            </div>
            <textarea className="input-box message-box">
            {/* <input type="text" placeholder="Enter your query" /> */}
            </textarea>
            <div className="button">
              <input type="button" value="Send Now" />
            </div>
          </form>
        </div>
      </div>
    </div>
 
  );
};

export default ContactUs;

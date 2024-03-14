import React from "react";
import Navbar from "./Navbar";
import "./profile.css";

function Profile() {
  return (
    <div className="profile">
      <Navbar />
      <div className="main-container1">
        <h1>My Profile</h1>
        <div className="profile-details">
          <div className="detail">
            <label htmlFor="firm">Firm Name:</label>
            <input type="text" id="firm" />
          </div>
          <div className="detail">
            <label htmlFor="name">Name of Owner:</label>
            <input type="text" id="name" />
          </div>
          <div className="detail">
            <label htmlFor="address">Firm Address:</label>
            <input type="text" id="address" />
          </div>
          <div className="detail">
            <label htmlFor="gst">GST Number:</label>
            <input type="text" id="gst" />
          </div>
          <div className="detail">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" />
          </div>
          <div className="detail">
            <label htmlFor="phone">Phone Number:</label>
            <input type="text" id="phone" />
          </div>
          <div className="button-group">
            <button className="edit-button">Edit</button>
            <button className="save-button">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

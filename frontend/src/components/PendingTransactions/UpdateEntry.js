import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const UpdateEntry = ({
  isVisible,
  onCancel,
  entryType,
  entry,
  handlePageUpdate,
}) => {
  const [Data, setData] = useState({
    name: "",
    phoneNo: "",
    email: "",
  });

  useEffect(() => {
    setData({
      name: entry.name,
      phoneNo: entry.phoneNo,
      email: entry.email,
    });
  }, [entry]);

  const handleInputChange = (key, value) => {
    setData({ ...Data, [key]: value });
    console.log(Data);
  };

  const handleSave = () => {
    if (entryType === "Customer") updateCustomer();
    else updateSupplier();
  };

  const updateCustomer = () => {
    onCancel();
    const { name, phoneNo, email } = Data;
    fetch("http://localhost:5050/api/pendingTransactions/updateCustomer", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        _id: entry._id,
        name,
        phoneNo,
        email,
      }),
    })
      .then((result) => {
        handlePageUpdate();
        alert("Successfully updated customer!");
      })
      .catch((err) => console.log(err));
  };

  const updateSupplier = () => {
    onCancel();
    const { name, phoneNo, email } = Data;
    fetch("http://localhost:5050/api/pendingTransactions/updateSupplier", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        _id: entry._id,
        name,
        phoneNo,
        email,
      }),
    })
      .then((result) => {
        handlePageUpdate();
        alert("Successfully updated supplier!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      isOpen={isVisible}
      contentLabel="Update Entry Dialog"
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Adjust overlay opacity as needed
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          width: "400px", // Adjust modal width as desired
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "5px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <h2>Update Entry</h2> {/* Heading */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            value={Data.name}
            name="name"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className="form-control"
            style={{
              width: "90%",
              padding: "5px 10px",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label htmlFor="phoneNo">Phone Number:</label>
          <input
            type="text"
            value={Data.phoneNo}
            name="phoneNo"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className="form-control"
            style={{
              width: "90%",
              padding: "5px 10px",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label htmlFor="Email">Email:</label>
          <input
            type="text"
            value={Data.email}
            name="email"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className="form-control"
            style={{
              width: "90%",
              padding: "5px 10px",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
          />
        </div>

        {/* <button type="submit" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button> */}

        <div
          className="button-group"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "10px 0 5px",
          }}
        >
          <button
            type="submit"
            onClick={handleSave}
            style={{
              width: "45%",
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              width: "45%",
              backgroundColor: "#eee",
              color: "#333",
              border: "1px solid #ccc",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default UpdateEntry;

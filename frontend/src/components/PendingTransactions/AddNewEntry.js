import React,{useState} from 'react';
import Modal from "react-modal";

const AddNewEntry = ({ isVisible, onCancel, entryType }) => {
    const [Data, setData] = useState({
        partyID: "",
        partyName: "",
        phoneNumber: "",
        email:"",
        amount:0,
        invoiceID:""
    });

const handleInputChange = (key, value) => {
        setData({ ...Data, [key]: value });
        console.log(Data);
      };

const handleSave = () => {
        if(entryType === "Customer")
          addNewCredit();
        else
          addNewDebit();
};

const addNewCredit = () => {
        fetch("http://localhost:5050/api/pendingTransactions/addNewCredit", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(Data),
        })
          .then((result) => {
            alert("Successfully added new customer!");
          })
          .catch((err) => console.log(err));
      };

  const addNewDebit = () => {
        fetch("http://localhost:5050/api/pendingTransactions/addNewDebit", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(Data),
        })
          .then((result) => {
            alert("Successfully added new supplier!");
          })
          .catch((err) => console.log(err));
      };

  return (
    (
<Modal
isOpen={isVisible}
contentLabel="New Entry Dialog"
shouldCloseOnOverlayClick={true}
ariaHideApp={false}
>
<h2>New Entry</h2> {/* Heading */}
<form
  onSubmit={(e) => {e.preventDefault();handleSave();onCancel();}}
>
              <label htmlFor="customerID"> ID:</label>
              <input type="text" value={Data.partyID} name="partyID" onChange={(e) => handleInputChange(e.target.name, e.target.value) } />
              <br />
              <label htmlFor="customerName"> Name:</label>
              <input type="text" value={Data.partyName} name="partyName" onChange={(e) =>handleInputChange(e.target.name, e.target.value)} />
              <br />
              <label htmlFor="phoneNo">Phone Number:</label>
              <input type="text" value={Data.phoneNumber} name="phoneNumber" onChange={(e) =>handleInputChange(e.target.name, e.target.value)} />
              <br />
              <label htmlFor="Email">Email:</label>
              <input type="text" value={Data.email} name="email" onChange={(e) =>handleInputChange(e.target.name, e.target.value)} />
              <br />
              <label htmlFor="InvoiceID">Invoice Id:</label>
              <input type="text" value={Data.invoiceID} name="invoiceID" onChange={(e) =>handleInputChange(e.target.name, e.target.value)} />
              <br />
              <label htmlFor="amount">Amount:</label>
              <input type="text" value={Data.amount} name="amount" onChange={(e) =>handleInputChange(e.target.name, e.target.value)} />
              <br />
            <button type="submit">
              Save
            </button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </form>
          </Modal>
    )
  )
};

export default AddNewEntry;
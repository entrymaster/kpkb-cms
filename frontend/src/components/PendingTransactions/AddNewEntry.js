import React,{useState} from 'react';
import Modal from "react-modal";

const AddNewEntry = ({ isVisible, onCancel, entryType, handlePageUpdate }) => {
    const [Data, setData] = useState({
        partyName: "",
        phoneNumber: "",
        email:"",
        amount:0,
    });

const handleInputChange = (key, value) => {
        setData({ ...Data, [key]: value });
        console.log(Data);
      };

const handleSave = () => {
  if(Data.amount > 0)
  {
        if(entryType === "Customer")
          addNewCredit();
        else
          addNewDebit();
  }
  else
  {
    onCancel();
    alert("Amount must greater than zero!");
  }
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
            fetch("http://localhost:5050/api/invoice/add", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
                userID: result.body.userID,
                invoiceID: 0,
                customerName: result.body.name,
                phoneNo: result.body.phoneNo,
                customerEmail: result.body.email,
                totalAmount: Data.amount,
                notes: "Amount added to credit",
                paymentMode: "Credit",
                discount:0,
                itemList: [],
                createdAt: new Date(),
            }
            ),
          })
            .then((result) => {
              alert("Invoice ADDED");
              console.log(result);
              handlePageUpdate();
              onCancel();
              setData({partyName:"", phoneNumber:"",email:"",amount:0});
            })
            .catch((err) => console.log(err));
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
            handlePageUpdate();
            onCancel();
            setData({partyName:"", phoneNumber:"",email:"",amount:0});
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
              <label htmlFor="customerName"> Name:</label>
              <input type="text" value={Data.partyName} name="partyName" onChange={(e) =>handleInputChange(e.target.name, e.target.value)} />
              <br />
              <label htmlFor="phoneNo">Phone Number:</label>
              <input type="text" value={Data.phoneNumber} name="phoneNumber" onChange={(e) =>handleInputChange(e.target.name, e.target.value)} />
              <br />
              <label htmlFor="Email">Email:</label>
              <input type="text" value={Data.email} name="email" onChange={(e) =>handleInputChange(e.target.name, e.target.value)} />
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
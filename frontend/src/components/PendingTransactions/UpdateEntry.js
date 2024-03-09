import React,{useState} from 'react';
import Modal from "react-modal";

const UpdateEntry = ({ isVisible, onCancel, entryType }) => {
    const [Data, setData] = useState({
        partyID:"",
        amount:0,
        invoiceID:""
    });

const handleInputChange = (key, value) => {
        setData({ ...Data, [key]: value });
        console.log(Data);
      };

const handleSave = () => {
        if(entryType === "Customer")
          updateCustomer();
        else
          updateSupplier();
};

const updateCustomer = () => {
        onCancel();
        fetch("http://localhost:5050/api/pendingTransactions/updateCustomer", {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(Data),
        })
          .then((result) => {
            alert("Successfully updated customer!");
          })
          .catch((err) => console.log(err));
      };

  const updateSupplier = () => {
        onCancel();
        fetch("http://localhost:5050/api/pendingTransactions/updateSupplier", {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(Data),
        })
          .then((result) => {
            alert("Successfully updated supplier!");
          })
          .catch((err) => console.log(err));
      };

return (
  (
<Modal
isOpen={isVisible}
contentLabel="Update Entry Dialog"
shouldCloseOnOverlayClick={true}
ariaHideApp={false}
>
<h2>Update Entry</h2> {/* Heading */}
<form
onSubmit={(e) => e.preventDefault()}
>
           <label htmlFor="customerID"> ID:</label>
           <input type="text" value={Data.partyID} name="partyID" onChange={(e) => handleInputChange(e.target.name, e.target.value) } />
           <br />
           <label htmlFor="InvoiceID">Invoice Id:</label>
           <input type="text" value={Data.invoiceID} name="invoiceID" onChange={(e) =>handleInputChange(e.target.name, e.target.value)} />
           <br />
           <label htmlFor="amount">Amount:</label>
           <input type="text" value={Data.amount} name="amount" onChange={(e) =>handleInputChange(e.target.name, e.target.value)} />
           <br />
         <button type="submit" onClick={handleSave}>
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
export default UpdateEntry;
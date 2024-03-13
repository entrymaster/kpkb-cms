import React,{useState, useEffect} from 'react';
import Modal from "react-modal";

const UpdateEntry = ({ isVisible, onCancel, entryType, entry, handlePageUpdate }) => {
    const [Data, setData] = useState({
        name:"",
        phoneNo:"",
        email:"",
    });

    useEffect(() => {setData({
      name: entry.name,
      phoneNo: entry.phoneNo,
      email: entry.email,
    })
    }, [entry]);

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
        const {name, phoneNo, email} = Data;
        fetch("http://localhost:5050/api/pendingTransactions/updateCustomer", {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(
            {
              _id: entry._id,
              name,
              phoneNo,
              email,
            }
          ),
        })
          .then((result) => {
            handlePageUpdate();
            alert("Successfully updated customer!");
          })
          .catch((err) => console.log(err));
      };

  const updateSupplier = () => {
        onCancel();
        const {name, phoneNo, email} = Data;
        fetch("http://localhost:5050/api/pendingTransactions/updateSupplier", {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(
            {
              _id: entry._id,
              name,
              phoneNo,
              email,
            }
          ),
        })
          .then((result) => {
            handlePageUpdate();
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
           <label htmlFor="Name"> Name:</label>
           <input type="text" value={Data.name} name="name" onChange={(e) => handleInputChange(e.target.name, e.target.value) } />
           <br />
           <label htmlFor="PhoneNo">Phone No:</label>
           <input type="text" value={Data.phoneNo} name="phoneNo" onChange={(e) =>handleInputChange(e.target.name, e.target.value)} />
           <br />
           <label htmlFor="email">Email:</label>
           <input type="text" value={Data.email} name="email" onChange={(e) =>handleInputChange(e.target.name, e.target.value)} />
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

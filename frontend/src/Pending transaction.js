// import React, { useState, useEffect } from "react";
// import "./Pending transactions.css";
// import AddNewEntry from "./components/PendingTransactions/AddNewEntry";
// import UpdateEntry from "./components/PendingTransactions/UpdateEntry";
// import UpdateAmt from "./components/PendingTransactions/UpdateAmount";
// import EditIcon from "@mui/icons-material/Edit";
// import { Link } from "react-router-dom";

// const PendingTransactions = () => {
//   const [activeTab, setActiveTab] = useState("credit-tab");

//   const openTab = (tabName) => {
//     setActiveTab(tabName);
//     handlePageUpdate();
//   };

//   const [Entries, setEntries] = useState([]);

//   const userID = "user";

//   const [updatePage, setUpdatePage] = useState(true);

//   const handlePageUpdate = () => {
//     setUpdatePage(!updatePage);
//   };

//   useEffect(() => {
//     fetchEntriesData();
//   }, [updatePage]);

//   const fetchEntriesData = () => {
//     if (activeTab === "credit-tab") fetchCreditCustomers();
//     else fetchDebitSuppliers();
//   };

//   const fetchCreditCustomers = () => {
//     fetch(`http://localhost:5050/api/pendingTransactions/getCust/${userID}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setEntries(data);
//         console.log(data);
//       })
//       .catch((err) => console.log(err));
//   };

//   const fetchDebitSuppliers = () => {
//     fetch(`http://localhost:5050/api/pendingTransactions/getSupp/${userID}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setEntries(data);
//         console.log(data);
//       })
//       .catch((err) => console.log(err));
//   };

//   const [entryType, setEntryType] = useState("Customer");
//   const [operationType, setOperationType] = useState("Subtraction");
//   const [entryID, setEntryID] = useState([]);
//   const [entry, setEntry] = useState([]);
//   const [isUpdateAmtDialogOpen, setIsUpdateAmtDialogOpen] = useState(false);

//   const showUpdateAmtDialog = () => {
//     setIsUpdateAmtDialogOpen(true);
//   };

//   const hideUpdateAmtDialog = () => {
//     setIsUpdateAmtDialogOpen(false);
//   };

//   const [isAddNewDialogOpen, setIsAddNewDialogOpen] = useState(false);
//   const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

//   const showAddNewDialog = () => {
//     setIsAddNewDialogOpen(true);
//   };
//   const showUpdateDialog = () => {
//     setIsUpdateDialogOpen(true);
//   };
//   const hideAddNewDialog = () => {
//     setIsAddNewDialogOpen(false);
//   };
//   const hideUpdateDialog = () => {
//     setIsUpdateDialogOpen(false);
//   };

//   const [totalAmt, setTotalAmt] = useState(0);

//   const handleTotalAmt = () => {
//     const amounts =
//       activeTab === "credit-tab"
//         ? Entries.map((Entry) => Entry.creditAmount)
//         : Entries.map((Entry) => Entry.debitAmount);
//     const total = amounts.reduce(
//       (accumulator, currentValue) => accumulator + currentValue,
//       0
//     );
//     setTotalAmt(total);
//   };

//   useEffect(() => {
//     handleTotalAmt();
//   }, [Entries]);

//   return (
//     <div className="PendingTrans">
//       <div className="container">
//         <div className="left">
//           <div className="left-top-box">
//             <img src="logo1.png" alt="logo" width={220} height={80} />
//           </div>
//           <div className="left-mid-box">
//             <img
//               src="profile_icon.png"
//               alt="Profile icon"
//               width={80}
//               height={80}
//             />
//             <div className="mid-text">
//               <p>
//                 Firm Name
//                 <br />
//                 GST Number
//               </p>
//             </div>
//           </div>
//           <div className="nav-panel">
//             <p>
//               <Link
//                 to="/dashboard"
//                 style={{ color: "white", textDecoration: "none" }}
//               >
//                 Dashboard
//               </Link>
//             </p>
//             <p>
//               <Link
//                 to="/invoice"
//                 style={{ color: "white", textDecoration: "none" }}
//               >
//                 Invoice
//               </Link>
//             </p>
//             <p>
//               <Link
//                 to="/inventory"
//                 style={{ color: "white", textDecoration: "none" }}
//               >
//                 Inventory
//               </Link>
//             </p>
//             <p style={{ backgroundColor: "#E0E0F7" }}>
//               <Link
//                 to="/pendingTransactions"
//                 style={{ color: "black", textDecoration: "none" }}
//               >
//                 Pending Transactions
//               </Link>
//             </p>
//             <p>
//               <Link
//                 to="/contactUs"
//                 style={{ color: "white", textDecoration: "none" }}
//               >
//                 Contact Us
//               </Link>
//             </p>
//             <p>
//               <Link
//                 to="/TransactionHistory"
//                 style={{ color: "white", textDecoration: "none" }}
//               >
//                 Transaction History
//               </Link>
//               <p>
//                 <Link
//                   to="/Reports"
//                   style={{ color: "white", textDecoration: "none" }}
//                 >
//                   Reports
//                 </Link>
//               </p>
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="top-panel">
//         <a className="heading">Pending Transactions</a>
//       </div>
//       <div className="main-container">
//         <div className="top">
//           <div className="search-bar-container">
//             <input type="text" className="search-bar" placeholder="Search" />
//           </div>
//           <div className="TotalAmount">
//             <h1>
//               {activeTab === "credit-tab" ? "Total Credit" : "Total Debit"}
//             </h1>
//             <a className="credit">{totalAmt}</a>
//           </div>
//         </div>
//       </div>

//       <div className="credit-debit-heading">
//         <button
//           className={
//             activeTab === "credit-tab" ? "active-tablinks" : "tablinks"
//           }
//           onClick={() => openTab("credit-tab")}
//         >
//           <h2>Credit</h2>
//         </button>
//         <button
//           className={activeTab === "debit-tab" ? "active-tablinks" : "tablinks"}
//           onClick={() => openTab("debit-tab")}
//         >
//           <h2>Debit</h2>
//         </button>
//       </div>

//       <div
//         id="credit-tab"
//         className={
//           activeTab === "credit-tab" ? "tabcontent-active" : "tabcontent"
//         }
//       >
//         <table style={{ border: "1px solid lightgray" }}>
//           <thead>
//             <tr className="headers">
//               <th>Customer Name</th>
//               <th>Phone No.</th>
//               <th>Email</th>
//               <th>Amount</th>
//               <th id="add-credit-button" onClick={showAddNewDialog}>
//                 Add New Customer
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {Entries &&
//               Entries.map((element, index) => {
//                 return (
//                   <tr key={element._id}>
//                     <td>{element.name}</td>
//                     <td>{element.phoneNo}</td>
//                     <td>{element.email}</td>
//                     <td>{element.creditAmount}</td>
//                     <td>
//                       {" "}
//                       <button
//                         id="add-credit-button"
//                         onClick={() => {
//                           setEntryType("Customer");
//                           setEntryID(element._id);
//                           setOperationType("Subtraction");
//                           showUpdateAmtDialog();
//                         }}
//                       >
//                         Clear Dues
//                       </button>
//                       {"  "}{" "}
//                       <button
//                         id="add-credit-button"
//                         onClick={() => {
//                           setEntryType("Customer");
//                           setEntryID(element._id);
//                           setOperationType("Addition");
//                           showUpdateAmtDialog();
//                         }}
//                       >
//                         Add to Credit
//                       </button>{" "}
//                       <EditIcon
//                         style={{ color: "blue", cursor: "pointer" }}
//                         onClick={() => {
//                           setEntryType("Customer");
//                           setEntry(element);
//                           showUpdateDialog();
//                         }}
//                       />
//                     </td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//       </div>

//       <div
//         id="debit-tab"
//         className={
//           activeTab === "debit-tab" ? "tabcontent-active" : "tabcontent"
//         }
//       >
//         <table>
//           <thead>
//             <tr className="headers">
//               <th>Supplier Name</th>
//               <th>Phone No.</th>
//               <th>Email</th>
//               <th>Amount</th>
//               <th id="add-credit-button" onClick={showAddNewDialog}>
//                 Add New Supplier
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {Entries &&
//               Entries.map((element, index) => {
//                 return (
//                   <tr key={element._id}>
//                     <td>{element.name}</td>
//                     <td>{element.phoneNo}</td>
//                     <td>{element.email}</td>
//                     <td>{element.debitAmount}</td>
//                     <td>
//                       {" "}
//                       <button
//                         id="add-credit-button"
//                         onClick={() => {
//                           setEntryType("Supplier");
//                           setEntryID(element._id);
//                           setOperationType("Subtraction");
//                           showUpdateAmtDialog();
//                         }}
//                       >
//                         Remove Amount
//                       </button>
//                       {"  "}{" "}
//                       <button
//                         id="add-credit-button"
//                         onClick={() => {
//                           setEntryType("Supplier");
//                           setEntryID(element._id);
//                           setOperationType("Addition");
//                           showUpdateAmtDialog();
//                         }}
//                       >
//                         Add Amount
//                       </button>{" "}
//                       <EditIcon
//                         style={{ color: "blue", cursor: "pointer" }}
//                         onClick={() => {
//                           setEntryType("Supplier");
//                           setEntry(element);
//                           showUpdateDialog();
//                         }}
//                       />
//                     </td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//       </div>

//       <AddNewEntry
//         isVisible={isAddNewDialogOpen}
//         onCancel={hideAddNewDialog}
//         entryType={entryType}
//         handlePageUpdate={handlePageUpdate}
//       />

//       <UpdateEntry
//         isVisible={isUpdateDialogOpen}
//         onCancel={hideUpdateDialog}
//         entryType={entryType}
//         entry={entry}
//         handlePageUpdate={handlePageUpdate}
//       />

//       <UpdateAmt
//         isVisible={isUpdateAmtDialogOpen}
//         onCancel={hideUpdateAmtDialog}
//         entryType={entryType}
//         operationType={operationType}
//         entryID={entryID}
//         handlePageUpdate={handlePageUpdate}
//       />
//     </div>
//   );
// };
// export default PendingTransactions;

import React, { useState, useEffect } from "react";
import "./Pending transactions.css";
import AddNewEntry from "./components/PendingTransactions/AddNewEntry";
import UpdateEntry from "./components/PendingTransactions/UpdateEntry";
import UpdateAmt from "./components/PendingTransactions/UpdateAmount";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import Navbar from './Navbar';
const PendingTransactions = () => {
  const [activeTab, setActiveTab] = useState("credit-tab");

  const openTab = (tabName) => {
    setActiveTab(tabName);
    handlePageUpdate();
  };

  const [Entries, setEntries] = useState([]);

  const userID = "user";

  const [updatePage, setUpdatePage] = useState(true);

  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  useEffect(() => {
    fetchEntriesData();
  }, [updatePage]);

  const fetchEntriesData = () => {
    if (activeTab === "credit-tab") fetchCreditCustomers();
    else fetchDebitSuppliers();
  };

  const fetchCreditCustomers = () => {
    fetch(`http://localhost:5050/api/pendingTransactions/getCust/${userID}`)
      .then((response) => response.json())
      .then((data) => {
        setEntries(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const fetchDebitSuppliers = () => {
    fetch(`http://localhost:5050/api/pendingTransactions/getSupp/${userID}`)
      .then((response) => response.json())
      .then((data) => {
        setEntries(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const [entryType, setEntryType] = useState("Customer");
  const [operationType, setOperationType] = useState("Subtraction");
  const [entryID, setEntryID] = useState([]);
  const [entry, setEntry] = useState([]);
  const [isUpdateAmtDialogOpen, setIsUpdateAmtDialogOpen] = useState(false);

  const showUpdateAmtDialog = () => {
    setIsUpdateAmtDialogOpen(true);
  };

  const hideUpdateAmtDialog = () => {
    setIsUpdateAmtDialogOpen(false);
  };

  const [isAddNewDialogOpen, setIsAddNewDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const showAddNewDialog = () => {
    setIsAddNewDialogOpen(true);
  };
  const showUpdateDialog = () => {
    setIsUpdateDialogOpen(true);
  };
  const hideAddNewDialog = () => {
    setIsAddNewDialogOpen(false);
  };
  const hideUpdateDialog = () => {
    setIsUpdateDialogOpen(false);
  };

  const [totalAmt, setTotalAmt] = useState(0);

  const handleTotalAmt = () => {
    const amounts =
      activeTab === "credit-tab"
        ? Entries.map((Entry) => Entry.creditAmount)
        : Entries.map((Entry) => Entry.debitAmount);
    const total = amounts.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    setTotalAmt(total);
  };

  useEffect(() => {
    handleTotalAmt();
  }, [Entries]);

  return (
    <div className="PendingTrans">
        <Navbar/>
      {/* <div className="container">
        <div className="left">
          <div className="left-top-box">
            <img src="logo1.png" alt="logo" width={220} height={80} />
          </div>
          <div className="left-mid-box">
            <img
              src="profile_icon.png"
              alt="Profile icon"
              width={80}
              height={80}
            />
            <div className="mid-text">
              <p>
                Firm Name
                <br />
                GST Number
              </p>
            </div>
          </div>
          <div className="nav-panel">
            <p>
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                Dashboard
              </Link>
            </p>
            <p>
              <Link
                to="/invoice"
                style={{ color: "white", textDecoration: "none" }}
              >
                Invoice
              </Link>
            </p>
            <p>
              <Link
                to="/inventory"
                style={{ color: "white", textDecoration: "none" }}
              >
                Inventory
              </Link>
            </p>
            <p style={{ backgroundColor: "#E0E0F7" }}>
              <Link
                to="/pendingTransactions"
                style={{ color: "black", textDecoration: "none" }}
              >
                Pending Transactions
              </Link>
            </p>
            <p>
              <Link
                to="/contactUs"
                style={{ color: "white", textDecoration: "none" }}
              >
                Contact Us
              </Link>
            </p>
            <p>
              <Link
                to="/Register"
                style={{ color: "white", textDecoration: "none" }}
              >
                Register
              </Link>
            </p>
            <p>
              <Link
                to="/TransactionHistory"
                style={{ color: "white", textDecoration: "none" }}
              >
                Transaction History
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="top-panel">
        <a className="heading">Pending Transactions</a>
      </div> */}
      <div className="main-container">
        <div className="top">
          <div className="search-bar-container">
            <input type="text" className="search-bar" placeholder="Search" />
          </div>
          <div className="TotalAmount">
            <h1>
              {activeTab === "credit-tab" ? "Total Credit" : "Total Debit"}
            </h1>
            <a className="credit">{totalAmt}</a>
          </div>
        </div>
      </div>

      <div className="credit-debit-heading">
        <button
          className={
            activeTab === "credit-tab" ? "active-tablinks" : "tablinks"
          }
          onClick={() => openTab("credit-tab")}
        >
          <h2>Credit</h2>
        </button>
        <button
          className={activeTab === "debit-tab" ? "active-tablinks" : "tablinks"}
          onClick={() => openTab("debit-tab")}
        >
          <h2>Debit</h2>
        </button>
      </div>

      <div
        id="credit-tab"
        className={
          activeTab === "credit-tab" ? "tabcontent-active" : "tabcontent"
        }
      >
        <table style={{ border: "1px solid lightgray" }}>
          <thead style={{ backgroundColor: "lightgray" }}>
            <tr className="headers">
              <th>Customer Name</th>
              <th>Phone No.</th>
              <th>Email</th>
              <th>Amount</th>
              <th id="add-credit-button" onClick={showAddNewDialog}>
                &emsp;&emsp; &emsp;Add New Customer
              </th>
            </tr>
          </thead>
          <tbody>
            {Entries &&
              Entries.map((element, index) => {
                return (
                  <tr
                    key={element._id}
                    style={{ borderBottom: "1px solid lightgray" }}
                  >
                    <td>{element.name}</td>
                    <td>{element.phoneNo}</td>
                    <td>{element.email}</td>
                    <td>{element.creditAmount}</td>
                    <td>
                      {" "}
                      <button
                        id="add-credit-button"
                        onClick={() => {
                          setEntryType("Customer");
                          setEntryID(element._id);
                          setOperationType("Subtraction");
                          showUpdateAmtDialog();
                        }}
                      >
                        Clear Dues
                      </button>
                      {"  "}{" "}
                      <button
                        id="add-credit-button"
                        onClick={() => {
                          setEntryType("Customer");
                          setEntryID(element._id);
                          setOperationType("Addition");
                          showUpdateAmtDialog();
                        }}
                      >
                        Add to Credit
                      </button>{" "}
                      <EditIcon
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => {
                          setEntryType("Customer");
                          setEntry(element);
                          showUpdateDialog();
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div
        id="debit-tab"
        className={
          activeTab === "debit-tab" ? "tabcontent-active" : "tabcontent"
        }
      >
        <table>
          <thead>
            <tr className="headers">
              <th>Supplier Name</th>
              <th>Phone No.</th>
              <th>Email</th>
              <th>Amount</th>
              <th id="add-credit-button" onClick={showAddNewDialog}>
                Add New Supplier
              </th>
            </tr>
          </thead>
          <tbody>
            {Entries &&
              Entries.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td>{element.name}</td>
                    <td>{element.phoneNo}</td>
                    <td>{element.email}</td>
                    <td>{element.debitAmount}</td>
                    <td>
                      {" "}
                      <button
                        id="add-credit-button"
                        onClick={() => {
                          setEntryType("Supplier");
                          setEntryID(element._id);
                          setOperationType("Subtraction");
                          showUpdateAmtDialog();
                        }}
                      >
                        Remove Amount
                      </button>
                      {"  "}{" "}
                      <button
                        id="add-credit-button"
                        onClick={() => {
                          setEntryType("Supplier");
                          setEntryID(element._id);
                          setOperationType("Addition");
                          showUpdateAmtDialog();
                        }}
                      >
                        Add Amount
                      </button>{" "}
                      <EditIcon
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => {
                          setEntryType("Supplier");
                          setEntry(element);
                          showUpdateDialog();
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <AddNewEntry
        isVisible={isAddNewDialogOpen}
        onCancel={hideAddNewDialog}
        entryType={entryType}
        handlePageUpdate={handlePageUpdate}
      />

      <UpdateEntry
        isVisible={isUpdateDialogOpen}
        onCancel={hideUpdateDialog}
        entryType={entryType}
        entry={entry}
        handlePageUpdate={handlePageUpdate}
      />

      <UpdateAmt
        isVisible={isUpdateAmtDialogOpen}
        onCancel={hideUpdateAmtDialog}
        entryType={entryType}
        operationType={operationType}
        entryID={entryID}
        handlePageUpdate={handlePageUpdate}
      />
    </div>
  );
};
export default PendingTransactions;

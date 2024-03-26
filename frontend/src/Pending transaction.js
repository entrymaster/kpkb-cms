import React, { useState, useEffect, useContext } from "react";
import "./Pending transactions.css";
import AddNewEntry from "./components/PendingTransactions/AddNewEntry";
import UpdateEntry from "./components/PendingTransactions/UpdateEntry";
import UpdateAmt from "./components/PendingTransactions/UpdateAmount";
import EditIcon from "@mui/icons-material/Edit";
import { Link, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import AuthContext from "./AuthContext";


const PendingTransactions = () => {
  
  const [activeTab, setActiveTab] = useState("credit-tab");
  const [Entries, setEntries] = useState([]);
  const authContext = useContext(AuthContext);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortBy, setSortBy] = useState('');
  const openTab = (tabName) => {
    setActiveTab(tabName);
    handlePageUpdate();
  };
  const sortEntries = (columnName) => {
    const sortedEntries = [...Entries];
    let newSortOrder;
  
    if (sortBy === columnName) {
      // If already sorted by the same column, reverse the order
      sortedEntries.reverse();
      // Toggle the direction of the arrow
      newSortOrder = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Sort the entries based on the selected column
      sortedEntries.sort((a, b) => {
        if (a[columnName] > b[columnName]) return 1;
        if (a[columnName] < b[columnName]) return -1;
        return 0;
      });
      // Set the default direction of the arrow to 'asc' when changing the column
      newSortOrder = 'asc';
    }
  
    // Update state variables
    setEntries(sortedEntries);
    setSortBy(columnName); // Update the state to track the selected column
    setSortDirection(newSortOrder); // Update the arrow direction
  };
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredEntries = Entries.filter(Entry =>
    Entry.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  
  //const userID = "user";
  const userID = authContext.user;
  const [updatePage, setUpdatePage] = useState(true);

  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  const fetchEntriesData = () => {
    if (activeTab === "credit-tab") fetchCreditCustomers();
    else fetchDebitSuppliers();
  };

  const fetchCreditCustomers = () => {
    fetch(`https://billing-360-dev.onrender.com/api/pendingTransactions/getCust/${userID}`)
      .then((response) => response.json())
      .then((data) => {
        setEntries(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const fetchDebitSuppliers = () => {
    fetch(`https://billing-360-dev.onrender.com/api/pendingTransactions/getSupp/${userID}`)
      .then((response) => response.json())
      .then((data) => {
        setEntries(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const SearchCreditCustomers = (query) => {
    const q = query;
    const userID = "user";
    fetch(
      `https://billing-360-dev.onrender.com/api/pendingTransactions/SearchCreditCust/${userID}?custName=${q}`
    )
      .then((response) => response.json())
      .then((data) => {
        setEntries(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const SearchDebitSuppliers = (query) => {
    const q = query;
    const userID = "user";
    fetch(
      `https://billing-360-dev.onrender.com/api/pendingTransactions/SearchDebitSupp/${userID}?suppName=${q}`
    )
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
  const [query, setQuery] = useState("");
  const [amount,setAmount] = useState(0);

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
    if (query === "") {
      const amounts =
        activeTab === "credit-tab"
          ? Entries.map((Entry) => Entry.creditAmount)
          : Entries.map((Entry) => Entry.debitAmount);
      const total = amounts.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      setTotalAmt(total);
    }
  };

  useEffect(() => {
    handleTotalAmt();
  }, [Entries]);

  useEffect(() => {
    if (query === "") fetchEntriesData();
    else {
      if (activeTab === "credit-tab") SearchCreditCustomers(query);
      else SearchDebitSuppliers(query);
    }
  }, [query]);

  useEffect(() => {
    if (query === "") fetchEntriesData();
    else {
      if (activeTab === "credit-tab") SearchCreditCustomers(query);
      else SearchDebitSuppliers(query);
    }
  }, [updatePage]);
  
  

  const auth = useContext(AuthContext);
  if (!auth.user) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="PendingTrans">
      <Navbar/>
      <div className="main-container">
        <div className="top">
          <div className="search-bar-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className="TotalAmount">
            <h2>
              {activeTab === "credit-tab" ? "Total Credit" : "Total Debit"}
            </h2>
            <p className="credit">{totalAmt}</p>
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
        <table id="inventoryTable">
          <thead style={{ backgroundColor: "lightly" }}>
            <tr className="headers">
            <th>
  CustomerName
  <button onClick={() =>  sortEntries('name')}>
    {/* Arrow icon */}
    {sortBy === 'name' ? (
    sortDirection === 'asc' ? <>&uarr;</> : <>&darr;</>
  ) : (
    <>&darr;</>
  )}
  </button>
</th>
<th>
  Phone No
  <button onClick={() =>  sortEntries('phoneNo')}>
    {/* Arrow icon */}
    {sortBy === 'phoneNo' ? (
    sortDirection === 'asc' ? <>&uarr;</> : <>&darr;</>
  ) : (
    <>&darr;</>
  )}
  </button>
</th>
<th>
  Email
  <button onClick={() =>  sortEntries('email')}>
    {/* Arrow icon */}
    {sortBy === 'email' ? (
    sortDirection === 'asc' ? <>&uarr;</> : <>&darr;</>
  ) : (
    <>&darr;</>
  )}
  </button>
</th>
<th>
 Amount
  <button onClick={() =>  sortEntries('creditAmount')}>
    {/* Arrow icon */}
    {sortBy === 'creditAmount' ? (
    sortDirection === 'asc' ? <>&uarr;</> : <>&darr;</>
  ) : (
    <>&darr;</>
  )}
  </button>
</th>
              <th id="add-new" style={{backgroundColor:"#c4dcf4"}} onClick={() => {setEntryType("Customer");showAddNewDialog();}}>
                Add New Customer
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {Entries &&
              Entries.map((element, index) => { */}
              {filteredEntries.map((element, index) => (
                // return (
                  <tr
                    key={element._id}
                    // style={{ borderBottom: "1px solid lightgray" }}
                  >
                    <td>{element.name}</td>
                    <td>{element.phoneNo}</td>
                    <td>{element.email}</td>
                    <td>{element.creditAmount}</td>
                    <td>
                      {" "}
                      <button
                        className="add-credit-button"
                        onClick={() => {
                          setEntryType("Customer");
                          setEntryID(element._id);
                          setAmount(element.creditAmount);
                          setOperationType("Subtraction");
                          showUpdateAmtDialog();
                        }}
                      >
                        Clear Dues
                      </button>
                      {"  "}{" "}
                      <button
                        className="add-credit-button"
                        onClick={() => {
                          setEntryType("Customer");
                          setEntryID(element._id);
                          setAmount(element.creditAmount);
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
                ))}
          </tbody>
        </table>
      </div>

      <div
        id="debit-tab"
        className={
          activeTab === "debit-tab" ? "tabcontent-active" : "tabcontent"
        }
      >
        <table id="inventoryTable">
          <thead>
          <tr className="headers">
            <th>
  Suppliers Name
  <button onClick={() =>  sortEntries('name')}>
    {/* Arrow icon */}
    {sortBy === 'name' ? (
    sortDirection === 'asc' ? <>&uarr;</> : <>&darr;</>
  ) : (
    <>&darr;</>
  )}
  </button>
</th>
<th>
  Phone No
  <button onClick={() =>  sortEntries('phoneNo')}>
    {/* Arrow icon */}
    {sortBy === 'phoneNo' ? (
    sortDirection === 'asc' ? <>&uarr;</> : <>&darr;</>
  ) : (
    <>&darr;</>
  )}
  </button>
</th>
<th>
  Email
  <button onClick={() =>  sortEntries('email')}>
    {/* Arrow icon */}
    {sortBy === 'email' ? (
    sortDirection === 'asc' ? <>&uarr;</> : <>&darr;</>
  ) : (
    <>&darr;</>
  )}
  </button>
</th>
<th>
 Amount
  <button onClick={() =>  sortEntries('debitAmount')}>
    {/* Arrow icon */}
    {sortBy === 'debitAmount' ? (
    sortDirection === 'asc' ? <>&uarr;</> : <>&darr;</>
  ) : (
    <>&darr;</>
  )}
  </button>
</th>
              <th
                id="add-new"
                style={{backgroundColor:"#c4dcf4"}}
                onClick={() => {
                  setEntryType("Supplier");
                  showAddNewDialog();
                }}
              >
                Add New Supplier
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries &&
              filteredEntries.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td>{element.name}</td>
                    <td>{element.phoneNo}</td>
                    <td>{element.email}</td>
                    <td>{element.debitAmount}</td>
                    <td>
                      {" "}
                      <button
                        className="add-credit-button"
                        onClick={() => {
                          setEntryType("Supplier");
                          setEntryID(element._id);
                          setAmount(element.debitAmount);
                          setOperationType("Subtraction");
                          showUpdateAmtDialog();
                        }}
                      >
                        Remove Amount
                      </button>
                      {"  "}{" "}
                      <button
                        className="add-credit-button"
                        onClick={() => {
                          setEntryType("Supplier");
                          setEntryID(element._id);
                          setAmount(element.debitAmount);
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
        id={userID}
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
        amount={amount}
        handlePageUpdate={handlePageUpdate}
      />
    </div>
  );
};
export default PendingTransactions;


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
//     fetch(`https://billing-360-dev.onrender.com/api/pendingTransactions/getCust/${userID}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setEntries(data);
//         console.log(data);
//       })
//       .catch((err) => console.log(err));
//   };

//   const fetchDebitSuppliers = () => {
//     fetch(`https://billing-360-dev.onrender.com/api/pendingTransactions/getSupp/${userID}`)
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


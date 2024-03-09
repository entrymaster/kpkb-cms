import React, {useState} from 'react';
import "./Pending transactions.css";
import AddNewEntry from "./components/PendingTransactions/AddNewEntry";
import UpdateEntry from "./components/PendingTransactions/UpdateEntry";
import { Link } from "react-router-dom";
import Modal from "react-modal";

const PendingTransactions = () => {

  const [activeTab, setActiveTab] = useState('credit-tab');

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };


  const [isAddNewDialogOpen, setIsAddNewDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isSelectTypeDialogOpen, setSelectTypeDialogOpen] = useState(false);

  const showSelectTypeDialog = () => {
    setIsAddNewDialogOpen(false);
    setIsUpdateDialogOpen(false);
    setSelectTypeDialogOpen(true);
  };
  const showAddNewDialog = () => {
    setSelectTypeDialogOpen(false);
    setIsAddNewDialogOpen(true);
  };
  const showUpdateDialog = () => {
    setSelectTypeDialogOpen(false);
    setIsUpdateDialogOpen(true);
  };
  const hideSelectTypeDialog = () => {
    setSelectTypeDialogOpen(false);
  };
  const hideAddNewDialog = () => {
    setIsAddNewDialogOpen(false);
  };
  const hideUpdateDialog = () => {
    setIsUpdateDialogOpen(false);
  };



    return (
        <div className="PendingTrans">
  <div className="container">
    <div className="left">
      <div className="left-top-box">
        <img src="logo1.png" alt="logo" width={220} height={80} />
      </div>
      <div className="left-mid-box">
        <img src="profile_icon.png" alt="Profile icon" width={80} height={80} />
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
          <Link to="/" style={{color: "white",  textDecoration: 'none'}}>Dashboard</Link>
          </p>
          <p>
          <Link to="/invoice" style={{color: "white", textDecoration: 'none'}}>Invoice</Link>
          </p>
          <p>
          <Link to="/inventory" style={{color: "white", textDecoration: 'none'}}>Inventory</Link>
          </p>
          <p style={{ backgroundColor: "#E0E0F7" }}>
          <Link to="/pendingTransactions" style={{color: "black", textDecoration: 'none'}}>Pending Transactions</Link>
          </p>
          <p>
          <Link to="/contactUs" style={{color: "white", textDecoration: 'none'}}>Contact Us</Link>
          </p>
      </div>
    </div>
  </div>
  <div className="top-panel">
    <a className="heading">Pending Transactions</a>
  </div>
  <div className="main-container">
    <div className="top">
      <div className="search-bar-container">
        <input type="text" className="search-bar" placeholder="Search" />
      </div>
      <div className="TotalCredit">
        <h1>Total Credit:</h1>
        <a className="credit"> 10000</a>
      </div>
    </div>
  </div>

  <div className="credit-debit-heading">
    <button className={activeTab === 'credit-tab' ? 'active-tablinks' : 'tablinks'} onClick={() => openTab('credit-tab')}>
      <h2>Credit</h2>
    </button>
    <button className={activeTab === 'debit-tab' ? 'active-tablinks' : 'tablinks'} onClick={() => openTab('debit-tab')}>
      <h2>Debit</h2>
    </button>
  </div>

  <div id="credit-tab" className={activeTab === 'credit-tab' ? 'tabcontent-active' : 'tabcontent'}>
  <table>
    <thead>
      <tr className="headers">
        <th>Customer Name/ID</th>
        <th>Phone No.</th>
        <th>Amount</th>
        <th id="add-credit-button" onClick={showSelectTypeDialog}>
              Add New Credit
        </th>
      </tr>
    </thead>
  </table>
  </div>

  <div id="debit-tab" className={activeTab === 'debit-tab' ? 'tabcontent-active' : 'tabcontent'}>
  <table>
    <thead>
      <tr className="headers">
        <th>Supplier Name/ID</th>
        <th>Phone No.</th>
        <th>Amount</th>
        <th id="add-credit-button" onClick={showSelectTypeDialog}>
              Add New Debit
        </th>
      </tr>
    </thead>
  </table>
  </div>

  <Modal
        isOpen={isSelectTypeDialogOpen}
        contentLabel="Select Type Dialog"
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        <button onClick={showAddNewDialog}>
          Add New Entry
        </button>
       <br/>
        <button onClick={showUpdateDialog}>
          Update Entry
        </button>
       <br/>
        <button onClick={hideSelectTypeDialog}>Close</button>
    </Modal>

    <AddNewEntry
        isVisible={isAddNewDialogOpen} onCancel={hideAddNewDialog} entryType= {activeTab === 'credit-tab' ? 'Customer' : 'Supplier'}
       /> 

    <UpdateEntry
        isVisible={isUpdateDialogOpen} onCancel={hideUpdateDialog} entryType= {activeTab === 'credit-tab' ? 'Customer' : 'Supplier'}
       /> 
</div>
    )
}
export default PendingTransactions;

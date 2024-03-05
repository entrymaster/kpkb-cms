import React from 'react';

class Inventory extends React.Component
{
    // showAddItemDialog = () => {
    //     var dialog = document.getElementById("addItemDialog");
    //     dialog.showModal();
    // };
    
    // hideAddItemDialog = () => {
    //     var dialog = document.getElementById("addItemDialog");
    //     dialog.close();
    // };
    
    // saveItem = () => {
    //     // Get the input values from the form
    //     var itemName = document.getElementById("item-name").value;
    //     var itemID = document.getElementById("item-id").value;
    //     var quantity = document.getElementById("quantity").value;
    //     var salesPrice = document.getElementById("sales-price").value;
    //     var costPrice = document.getElementById("cost-price").value;
    //     var gst = document.getElementById("gst").value;
    //     var category = document.getElementById("category").value;
    //     var batchExpiry = document.getElementById("batch-expiry").value;
    //     var discount = document.getElementById("discount").value;

    //     // Get the table body
    //     var tableBody = document.getElementById("item-table-body");

    //     // Create a new row
    //     var newRow = tableBody.insertRow();

    //     // Create cells for the new row
    //     var cell1 = newRow.insertCell(0);
    //     var cell2 = newRow.insertCell(1);
    //     var cell3 = newRow.insertCell(2);
    //     var cell4 = newRow.insertCell(3);

    //     // Add content to the cells
    //     cell1.textContent = itemName;
    //     cell2.textContent = salesPrice;
    //     cell3.textContent = costPrice;
    //     cell4.textContent = quantity;

    //     // Close the dialog
    //     hideAddItemDialog();
    // };

    render() {

        return (
            <>
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
        {/* <h2>Navigation</h2> */}
        <a href="#" className="nav-link">
          Dashboard
        </a>
        <a href="#" className="nav-link">
          Invoice
        </a>
        <a href="#" className="nav-link">
          Inventory
        </a>
        <a href="#" className="nav-link">
          Pending Transactions
        </a>
        <a href="#" className="nav-link">
          Transaction History
        </a>
        <a href="#" className="nav-link">
          Reports
        </a>
        <a href="#" className="nav-link">
          FAQs
        </a>
        <a href="#" className="nav-link">
          Contact Us
        </a>
      </div>
    </div>
  </div>
  <div className="top-panel">
    <div style={{ textAlign: "left", marginLeft: 250, marginTop: 15 }}>
      <h1 style={{ color: "#fff", fontSize: 40 }}>Inventory</h1>
    </div>
  </div>
  <div className="main-container">
    <div className="add-button-container">
      <button className="add-item-button" onclick="showAddItemDialog()">
        <strong> Add New Item </strong>
      </button>
    </div>
    <div className="top">
      <div className="search-bar-container">
        <input type="text" className="search-bar" placeholder="Search" />
        <div className="search-icon">🔍</div>
        <div className="circle" />
      </div>
    </div>
    <table>
      <thead>
        <tr className="headers">
          <th>Item Name/ID</th>
          <th>Sale Price</th>
          <th>Purchase Price</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody id="item-table-body">
        <tr className="First">
          <td>Lux Soap 50g</td>
          <td>10</td>
          <td>8</td>
          <td>50</td>
        </tr>
        <tr className="Second">
          <td>Maggie 70g</td>
          <td>14</td>
          <td>10</td>
          <td>100</td>
        </tr>
        {/* Add more rows as needed */}
      </tbody>
    </table>
    <dialog id="addItemDialog">
      <form onsubmit="saveItem(); return false;">
        <table>
          <tbody>
            <tr>
              <td>
                <input type="text" id="item-name" placeholder="Item Name" />
              </td>
              <td>
                <input type="text" id="item-id" placeholder="Item ID" />
              </td>
              <td>
                <input type="text" id="quantity" placeholder="Quantity" />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  id="sales-price"
                  placeholder="Sales Price/unit"
                />
              </td>
              <td>
                <input
                  type="text"
                  id="cost-price"
                  placeholder="Cost Price/unit"
                />
              </td>
              <td>
                <input type="text" id="gst" placeholder="GST" />
              </td>
            </tr>
            <tr>
              <td>
                <input type="text" id="category" placeholder="Category" />
              </td>
              <td>
                <input
                  type="text"
                  id="batch-expiry"
                  placeholder="Batch Expiry"
                />
              </td>
              <td>
                <input type="text" id="discount" placeholder="Discount (%)" />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Save</button>
        <button type="button" onclick="hideAddItemDialog()">
          Cancel
        </button>
      </form>
    </dialog>
  </div>
</>
  );

    }
    
}

export default Inventory;
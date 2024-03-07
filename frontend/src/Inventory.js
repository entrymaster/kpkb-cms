import React,{useState, useEffect} from 'react';
import './Inventory.css';
import { Link } from "react-router-dom";
import AddItemDialog from './components/AddProduct';
import UpdateItemDialog from './components/UpdateProduct';
import DeleteIcon from '@mui/icons-material/Delete';
const Inventory = () =>
{
  const [isAddItemDialogVisible, setAddItemDialogVisibility] = useState(false);
  const [isUpdateItemDialogVisible, setUpdateItemDialogVisibility] = useState(false);
  const [products, setAllProducts] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [itemName, setItemName] = useState();
  const toggleAddItemDialog = () => {
    setAddItemDialogVisibility(!isAddItemDialogVisible);
    console.log({isAddItemDialogVisible});
  };
  const toggleUpdateItemDialog = () => {
    setUpdateItemDialogVisibility(!isUpdateItemDialogVisible);
    console.log({isUpdateItemDialogVisible});
  };
  const updateProductModalSetting = (selectedProductData) => {
    console.log("Clicked: edit");
    setUpdateProduct(selectedProductData);
    toggleUpdateItemDialog ();
  };

  useEffect(() => {
    fetchProductsData();
    fetchSearchData();
    // fetchSalesData();
  }, [updatePage]);
  const userId = "user";
  const fetchProductsData = () => {
    fetch(`http://localhost:5050/api/inventory/get/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };
  const fetchSearchData = () => {
    fetch(`http://localhost:5050/api/inventory/search/${userId}?itemName=${itemName}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };
  const handleItemName = (e) => {
    setItemName(e.target.value);
    fetchSearchData();
  };
  const deleteItem = (id) => {
    // console.log("Product ID: ", id);
    // console.log(http://localhost:5000/api/inventory/delete/${id});
    fetch(`http://localhost:5050/api/inventory/delete/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUpdatePage(!updatePage);
        // Display alert message
        alert("Product deleted");
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        // Handle error if necessary
      });
};
  
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

  

        return (
            <div className="Inventory">
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
          <p style={{ backgroundColor: "#E0E0F7" }}>
          <Link to="/inventory" style={{color: "black", textDecoration: 'none'}}>Inventory</Link>
          </p>
          <p>
          <Link to="/pendingTransactions" style={{color: "white", textDecoration: 'none'}}>Pending Transactions</Link>
          </p>
          <p>
          <Link to="/contactUs" style={{color: "white", textDecoration: 'none'}}>Contact Us</Link>
          </p>
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
<<<<<<< HEAD
      <button className="add-item-button" onClick="showAddItemDialog()">
=======
      <button className="add-item-button" onClick={toggleAddItemDialog}>
>>>>>>> b8cda95ed4fea57387db727f5a05b6f9f1bf0231
        <strong> Add New Item </strong>
      </button>
    </div>
    <AddItemDialog
        isVisible={isAddItemDialogVisible}
        
        onCancel={toggleAddItemDialog}
      />
          <UpdateItemDialog
    isVisible={isUpdateItemDialogVisible}
    onCancel={toggleUpdateItemDialog}
    element={updateProduct}
    /> 
    <div className="top">
      <div className="search-bar-container">
        <input type="text" className="search-bar" placeholder="Search"
        value={itemName}
        onChange={handleItemName}
        />
        <div className="search-icon">🔍</div>
        <div className="circle" />
      </div>
    </div>
<<<<<<< HEAD
      <br></br>
    <table>
      <thead>
        <tr className="headers">
          <th>Item Name/ID</th>
          <th>Sale Price</th>
          <th>Purchase Price</th>
          <th>Stock</th>
=======
    <table id="inventoryTable">
        <thead>
          <tr class="headers">
          <th>ITEM ID</th>
            <th>ITEM NAME</th>
            <th>SALE PRICE</th>
            <th>COST PRICE</th>
            <th>STOCK</th>
            <th>MORE ACTIONS</th>
          </tr>
        </thead>
        <tbody>
    {products.map((element, index) => {
      return (
        <tr key={element._id}>
          <td>{element.itemID}</td>
          <td>{element.itemName}</td>
          <td>{element.salePrice}</td>
          <td>{element.costPrice}</td>
          <td>{element.quantity }</td>
          <td>
            <span
              //className="text-green-700 cursor-pointer"
              onClick={() => updateProductModalSetting(element)}
            >
              Edit{" "}
            </span>
            <span
              //className="text-red-600 px-2 cursor-pointer"
              //onClick={() => deleteItem(element._id)}
            >
              <DeleteIcon
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={() => deleteItem(element._id)}
                />
            </span>
          </td> 
>>>>>>> b8cda95ed4fea57387db727f5a05b6f9f1bf0231
        </tr>
      );
    })}
  </tbody>
      </table>
    {/* <dialog id="addItemDialog">
      <form onSubmit="saveItem(); return false;">
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
        <button type="button" onClick="hideAddItemDialog()">
          Cancel
        </button>
      </form>
    </dialog> */}
  </div>
</div>
  );

    
    
}

export default Inventory;
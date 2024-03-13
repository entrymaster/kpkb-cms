import React,{useState, useEffect, useContext} from 'react';
import './Inventory.css';
import { Link } from "react-router-dom";
import AddItemDialog from './components/AddProduct';
import UpdateItemDialog from './components/UpdateProduct';
import AddBatchDialog from './components/AddBatch';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewBatchDialog from './components/ViewBatch';
import AuthContext from './AuthContext';
const Inventory = () =>
{
  const [isAddItemDialogVisible, setAddItemDialogVisibility] = useState(false);
  const [isUpdateItemDialogVisible, setUpdateItemDialogVisibility] = useState(false);
  const [isViewBatchDialogVisible, setViewBatchDialogVisibility] = useState(false);
  const [isAddBatchDialogVisible, setAddBatchDialogVisibility] = useState(false);
  const [products, setAllProducts] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);
  const [updateProduct, setUpdateProduct] = useState([]);
  const[addBatch,setAddBatch]=useState([]);
  const[updateBatch,setUpdateBatch]=useState([]);
  const [itemName, setItemName] = useState();
  const authContext = useContext(AuthContext);
  const toggleAddItemDialog = () => {
    setAddItemDialogVisibility(!isAddItemDialogVisible);
    console.log({isAddItemDialogVisible});
  };
  const toggleUpdateItemDialog = () => {
    setUpdateItemDialogVisibility(!isUpdateItemDialogVisible);
    console.log({isUpdateItemDialogVisible});
  };
  const toggleViewBatchDialog = () => {
    setViewBatchDialogVisibility(!isViewBatchDialogVisible);
    console.log({isViewBatchDialogVisible});
  }
  const toggleAddBatchDialog = () => {
    setAddBatchDialogVisibility(!isAddBatchDialogVisible);
    console.log({isAddBatchDialogVisible});
  };
  const updateProductModalSetting = (selectedProductData) => {
    console.log("Clicked: edit");
    setUpdateProduct(selectedProductData);
    toggleUpdateItemDialog ();
  };
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  const addBatchModalSetting = (selectedProductData) => {
    console.log("Clicked:add batch");
    console.log(selectedProductData);
    setAddBatch(selectedProductData._id);
    toggleAddBatchDialog ();
  };
  const viewBatchModalSetting = (selectedProductData) => {
    console.log("Clicked:update batch");
    setUpdateBatch(selectedProductData);
    toggleViewBatchDialog ();
  };

  useEffect(() => {
    fetchProductsData();

    // fetchSalesData();
  }, [updatePage]);
  const userId = "user";
  // const userId=authContext.user;
  console.log(userId);
  const fetchProductsData = () => {
    fetch('http://localhost:5050/api/inventory/get/${userId}')
    // fetch(`http://localhost:5050/api/inventory/get/${authContext.user}`)
    .then((response) => response.json())
    .then((data) => {
      setAllProducts(data);
      console.log(data);
    })
    .catch((err) => console.log(err));

};
const fetchSearchData = () => {
  fetch(`http://localhost:5050/api/inventory/search/${userId}?itemName=${itemName}`)
    .then((response) => response.json())
    .then((data) => {
      setAllProducts(data);
      console.log(data);
    })
    .catch((err) => console.log(err));
};
const handleItemName = (e) => {
  setItemName(e.target.value);
  fetchSearchData();
};

const deleteItem = (id) => {
  console.log("Product ID: ", id);
  fetch(`http://localhost:5050/api/inventory/delete/${id}`)
    .then((response) => response.json())
    .then((data) => {
      setUpdatePage(!updatePage);
    });
};
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
          <p>
          <Link to="/Register" style={{color: "white", textDecoration: 'none'}}>Register</Link>
          </p>
          <p>
          <Link to="/TransactionHistory" style={{color: "white", textDecoration: 'none'}}>Transaction History</Link>
          </p>
      </div>
    </div>
  </div>
  <div className="top-panel">
    <div style={{ textAlign: "left", marginTop: 15 }}>
      <h1 style={{ color: "#fff", fontSize: 40 }}>Inventory</h1>
    </div>
  </div>
  <div className="main-container">
    <div className="add-button-container">
      <button className="add-item-button" onClick={toggleAddItemDialog}>
        <strong> Add New Item </strong>
      </button>
    </div>
    <AddItemDialog
        isVisible={isAddItemDialogVisible}
        
        onCancel={toggleAddItemDialog}
        handlePageUpdate={handlePageUpdate}
      />
    <UpdateItemDialog
    isVisible={isUpdateItemDialogVisible}
    onCancel={toggleUpdateItemDialog}
    element={updateProduct}
    handlePageUpdate = {handlePageUpdate}
    /> 
    <AddBatchDialog
    isVisible={isAddBatchDialogVisible}
    onCancel={toggleAddBatchDialog}
    element={addBatch}
    handlePageUpdate = {handlePageUpdate}
    /> 
    <ViewBatchDialog
    isVisible={isViewBatchDialogVisible}
    onCancel={toggleViewBatchDialog}
    batches={updateBatch.batchList}
    id = {updateBatch._id}
    handlePageUpdate = {handlePageUpdate}
    /> 
    <div className="top">
      <div className="search-bar-container">
        <input type="text" className="search-bar" placeholder="Search"
        value={itemName}
        onChange={handleItemName}
        />
        <div className="search-icon">🔍</div>
        {/* <div className="circle" /> */}
      </div>
    </div>
    <table id="inventoryTable">
        <thead>
          <tr class="headers">
          <th>ITEM ID</th>
            <th>ITEM NAME</th>
            <th>SALE PRICE</th>
            <th>COST PRICE</th>
            <th>STOCK</th>
            <th>MORE ACTIONS</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
    {products && products.map((element, index) => {
      return (
        <tr key={element._id}>
          <td>{element.itemID}</td>
          <td>{element.itemName}</td>
          <td>{element.salePrice}</td>
          <td>{element.costPrice}</td>
          <td>{element.quantity }</td>
          <td>
            <span
            className="action-button"
              //className="text-green-700 cursor-pointer"
              onClick={() => updateProductModalSetting(element)}
            >
              EditItem{" "}
            </span>
            <span
            className="action-button"
              //className="text-green-700 cursor-pointer"
              onClick={() => addBatchModalSetting(element)}
            >
              AddBatch{" "}
            </span>
            <span
            className="action-button"
              //className="text-green-700 cursor-pointer"
              onClick={() => viewBatchModalSetting(element)}
            >
              ViewBatch{" "}
            </span>
            </td>
            <td> 
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
        </tr>
      );
    })}
  </tbody>
      </table>
  </div>
</div>
  );

    
    
}

export default Inventory;// main inventory.js
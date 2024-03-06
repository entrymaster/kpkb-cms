import React,{useState} from 'react';
import './AddProduct.css'
const AddItemDialog = ({ isVisible, onCancel }) => {
    const [itemData, setItemData] = useState({
        userID: 'user',
        itemID: '',
        itemName: '',
        salePrice: 0,
        costPrice: 0,
        itemGST: 0,
        category: '',
        discount: 0,
        quantity: 0,
        // batchList: [],
      });
    const handleInputChange = (key, value) => {
        setItemData({ ...itemData, [key]: value });
        console.log(itemData);
      };
      const addProduct = () => {
        fetch("http://localhost:5000/api/inventory/add", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(itemData),
        })
          .then((result) => {
            alert("Product ADDED");
            // handlePageUpdate();
            //addProductModalSetting();
            onCancel();
          })
          .catch((err) => console.log(err));
      };
  return (
    isVisible && (
      /*<dialog isopen="true" id="addItemDialog">*/
        <form onSubmit={(e) => { e.preventDefault();  }}>
          <table>
            <tbody>
            <tr>
              <td><input type="text" id="item-name" placeholder="Item Name" value={itemData.itemName} name="itemName" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }/></td>
              <td><input type="text" id="item-id" placeholder="Item ID" value={itemData.itemID} name="itemID" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }/></td>
              <td><input type="number" id="quantity" placeholder="Quantity" value={itemData.quantity} name="quantity" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }/></td>
            </tr>
            <tr>
              <td><input type="number" id="sales-price" placeholder="Sales Price/unit" value={itemData.salePrice} name="salePrice" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }/></td>
              <td><input type="number" id="cost-price" placeholder="Cost Price/unit" value={itemData.costPrice} name="costPrice"onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }/></td>
              <td><input type="number" id="gst" placeholder="GST" value={itemData.itemGST} name="itemGST" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }/></td>
            </tr>
            <tr>
              <td><input type="text" id="category" placeholder="Category" value={itemData.category} name="category" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }/></td>
              <td><input type="text" id="batch-expiry" placeholder="Batch Expiry" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }/></td>
              <td><input type="number" id="discount" placeholder="Discount (%)" value={itemData.discount} name="discount" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }/></td>
            </tr>
            </tbody>
          </table>

          <button type="submit" onClick={addProduct}>Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      /*</dialog>*/
    )
  );
};

export default AddItemDialog;
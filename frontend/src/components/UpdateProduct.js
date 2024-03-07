import React, { useState, useEffect } from 'react';
import './AddProduct.css';

const UpdateItemDialog = ({ isVisible, onCancel, element }) => {
  const { _id, itemID, itemName, salePrice, costPrice, itemGST, category, discount, quantity } = element;

  const [itemData, setItemData] = useState({
    _id: _id,
    itemID: itemID,
    itemName: itemName,
    salePrice: salePrice,
    costPrice: costPrice,
    itemGST: itemGST,
    category: category,
    discount: discount,
    quantity: quantity,
    // batchList: [],
  });
    const handleInputChange = (key, value) => {
        setItemData({ ...itemData, [key]: value });
        console.log(itemData);
      };
      const updateProduct = () => {
        fetch("http://localhost:5050/api/inventory/update", {
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
      <dialog open id="addItemDialog">
        <form onSubmit={(e) => { e.preventDefault();  }}>
          <table>
            
            <tbody>
            <tr>
              <td><input type="text" id="item-name" placeholder="Item Name" value={itemData.itemName} name="itemName" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              } readonly/></td>
              <td><input type="text" id="item-id" placeholder="Item ID" value={itemData.itemID} name="itemID" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              } readonly/></td>
              <td><input type="number" id="quantity" placeholder="Quantity" value={itemData.quantity} name="quantity" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              } readonly/></td>
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
                              } readonly/></td>
              <td><input type="text" id="batch-expiry" placeholder="Batch Expiry" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              } readonly/></td>
              <td><input type="number" id="discount" placeholder="Discount (%)" value={itemData.discount} name="discount" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              } readonly/></td>
            </tr>
            </tbody>
          </table>

          <button type="submit" onClick={updateProduct}>Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      </dialog>
    )
  );
};

export default UpdateItemDialog;
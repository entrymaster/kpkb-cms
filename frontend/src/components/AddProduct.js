import React from 'react';
import './AddProduct.css'
const AddItemDialog = ({ isVisible, onCancel }) => {
  return (
    isVisible && (
      /*<dialog isopen="true" id="addItemDialog">*/
        <form onSubmit={(e) => { e.preventDefault();  }}>
          <table>
            <tbody>
            <tr>
              <td><input type="text" id="item-name" placeholder="Item Name" /></td>
              <td><input type="text" id="item-id" placeholder="Item ID" /></td>
              <td><input type="text" id="quantity" placeholder="Quantity" /></td>
            </tr>
            <tr>
              <td><input type="text" id="sales-price" placeholder="Sales Price/unit" /></td>
              <td><input type="text" id="cost-price" placeholder="Cost Price/unit" /></td>
              <td><input type="text" id="gst" placeholder="GST" /></td>
            </tr>
            <tr>
              <td><input type="text" id="category" placeholder="Category" /></td>
              <td><input type="text" id="batch-expiry" placeholder="Batch Expiry" /></td>
              <td><input type="text" id="discount" placeholder="Discount (%)" /></td>
            </tr>
            </tbody>
          </table>

          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      /*</dialog>*/
    )
  );
};

export default AddItemDialog;
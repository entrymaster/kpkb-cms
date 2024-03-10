import React,{useState, useContext} from 'react';
import './AddProduct.css'
import AuthContext from '../AuthContext';
const AddItemDialog = ({ isVisible, onCancel,handlePageUpdate, }) => {
  const authContext = useContext(AuthContext);
    const [itemData, setItemData] = useState({
        //userID: 'user',
        userID: authContext.user,
        itemID: '',
        itemName: '',
        salePrice: '',
        costPrice: '',
        itemGST: '',
        category: '',
        discount: '',
        quantity: 0,
        // batchList: [],
      });
    const handleInputChange = (key, value) => {
        setItemData({ ...itemData, [key]: value });
        console.log(itemData);
      };
      const addProduct = () => {
        fetch("http://localhost:5050/api/inventory/add", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(itemData),
        })
          .then((result) => {
            alert("Product ADDED");
            handlePageUpdate();
            //addProductModalSetting();
            onCancel();
            setItemData({ // Resetting fields to initial state
              userID: 'user',
              itemID: '',
              itemName: '',
              salePrice: '',
              costPrice: '',
              itemGST: '',
              category: '',
              discount: '',
              quantity: 0,
            });
          })
          .catch((err) => console.log(err));
      };
      const handleCancel = () => {
        onCancel();
        setItemData({ // Resetting fields to initial state
          userID: 'user',
          itemID: '',
          itemName: '',
          salePrice: '',
          costPrice: '',
          itemGST: '',
          category: '',
          discount: '',
          quantity: 0,
        });
      };
  return (
    isVisible && (
      <dialog open id="addItemDialog">
        <form onSubmit={(e) => { e.preventDefault();  }}>
          <table>
            
            <tbody>
            <tr>
            <td className="label-cell">Item Name:</td>
              <td><input type="text" id="item-name" placeholder="Item Name" value={itemData.itemName} name="itemName" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }/></td>
           <td className="label-cell">Item ID:</td>
              <td><input type="text" id="item-id" placeholder="Item ID" value={itemData.itemID} name="itemID" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }/></td>
              {/* <td><input type="number" id="quantity" placeholder="Quantity" value={itemData.quantity} name="quantity" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }/></td> */}
            <td className="label-cell">Quantity:</td>
            <td><input type="text" value="Quantity = 0" readOnly /> </td>
            </tr>
            <tr>
            <td className="label-cell">salePrice:</td>
              <td><input type="number" id="sales-price" placeholder="Sales Price/unit" value={itemData.salePrice} name="salePrice" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }/></td>
                              
                              <td className="label-cell">costPrice:</td>
              <td><input type="number" id="cost-price" placeholder="Cost Price/unit" value={itemData.costPrice} name="costPrice"onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }/></td>
                                <td className="label-cell">GST:</td>
              <td><input type="number" id="gst" placeholder="GST" value={itemData.itemGST} name="itemGST" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }/></td>
            </tr>
            <tr>
            <td className="label-cell">Category:</td>
              <td><input type="text" id="category" placeholder="Category" value={itemData.category} name="category" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }/></td>
                               <td className="label-cell">Batch Expiry:</td>
              <td><input type="text" id="batch-expiry" placeholder="Batch Expiry" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }/></td>
                              <td className="label-cell">Discount:</td>
              <td><input type="number" id="discount" placeholder="Discount (%)" value={itemData.discount} name="discount" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }/></td>
            </tr>
            </tbody>
          </table>

          <button type="submit" onClick={addProduct}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      </dialog>
    )
  );
};

export default AddItemDialog;
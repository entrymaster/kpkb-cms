import React,{useState,useEffect} from 'react';
import './AddProduct.css'
const UpdateItemDialog = ({ isVisible, onCancel, element }) => {
    useEffect(() => {
        setItemData((prevItemData) => ({
          ...prevItemData,
          _id: element._id,
          itemID: element.itemID,
             itemName: element.itemName,
      salePrice: element.salePrice,
      costPrice: element.costPrice,
      itemGST: element.itemGST,
      category: element.category,
      discount: element.discount,
      quantity: element.quantity,
        }));
      }, [element]);
    const [itemData, setItemData] = useState({
      _id: '',
      itemID: '',
     itemName: '',
     salePrice: '',
     costPrice: '',
     itemGST: '',
    category: '',
    discount: '',
     quantity: '',
      // batchList: [],
    });
    const resetFields = () => {
        setItemData({
          _id: '',
          itemID: '',
          itemName: '',
          salePrice: '',
          costPrice: '',
          itemGST: '',
          category: '',
          discount: '',
          quantity: '',
        });
      };
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
            resetFields();
            //handlePageUpdate();
            //addProductModalSetting();
            onCancel();
          })
          .catch((err) => console.log(err));
      };
      const handleCancel = () => {
        onCancel();
        resetFields();
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
                              } readOnly  className="read-only-input"/></td>
           <td className="label-cell">Item ID:</td>
              <td><input type="text" id="item-id" placeholder="Item ID" value={itemData.itemID} name="itemID" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              } readOnly  className="read-only-input"/></td>
              {/* <td><input type="number" id="quantity" placeholder="Quantity" value={itemData.quantity} name="quantity" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }/></td> */}
            <td className="label-cell">Quantity:</td>
            <td><input type="text" value="Quantity = 0" readOnly  className="read-only-input" /> </td>
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
                              } readOnly  className="read-only-input"/></td>
                               <td className="label-cell">Batch Expiry:</td>
              <td><input type="text" id="batch-expiry" placeholder="Batch Expiry" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value) 
                              } readOnly  className="read-only-input"/></td>
                              <td className="label-cell">Discount:</td>
              <td><input type="number" id="discount" placeholder="Discount (%)" value={itemData.discount} name="discount" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              } readOnly  className="read-only-input"/></td>
            </tr>
            </tbody>
          </table>

          <button type="submit" onClick={ updateProduct}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      </dialog>
    )
  );
};

export default UpdateItemDialog;
import React,{useState,useEffect} from 'react';
import './AddProduct.css'
const UpdateBatchDialog = ({ isVisible, onCancel, element, id }) => {
    useEffect(() => {
        setItemData((prevItemData) => ({
            ...prevItemData,
            _idProduct : id,
            _id: element._id,
            batchID: element.batchID,
            batchQty: element.batchQty,
            expiryDate: element.expiryDate,
            initialBatchQty: element.batchQty,
            
        }));
    }, [element]);
    
    
    const [itemData, setItemData] = useState({
        _idProduct : id,
        _id: '',
        batchID: '',
        batchQty: '',
        expiryDate: '',
        initialBatchQty: element.batchQty,
    });
    
    const resetFields = () => {
        setItemData({
            _idProduct : id,
            _id: '',
            batchID: '',
            batchQty: '',
            expiryDate: '',
            initialBatchQty: element.batchQty,
        });
    };
    const handleInputChange = (key, value) => {
        setItemData({ ...itemData, [key]: value });
        console.log(itemData);
      };
      const updateBatch = () => {
        fetch("http://localhost:5050/api/inventory/updateBatch", {
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
              <td><input type="text" id="batch-id" value={`Batch Id : ${itemData.batchID}`} readOnly
                               /></td>
              <td><input type="number" id="item-id" placeholder="Batch Qty" value={itemData.batchQty} name="batchQty" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              } /></td>
              <td><input type="text" id="expiry date"  value= {`Batch Expiry Date :  ${itemData.expiryDate}`} 
                               readOnly/></td>
            </tr>
            {/* <tr>
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
            </tr> */}
            </tbody>
          </table>

          <button type="submit" onClick={updateBatch}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      </dialog>
    )
  );
};

export default UpdateBatchDialog;
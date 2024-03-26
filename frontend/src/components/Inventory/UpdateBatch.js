import React,{useState,useEffect} from 'react';
import './AddProduct.css'
const UpdateBatchDialog = ({ isVisible, on_Cancel, element, id,  }) => {
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
            _idProduct: id,
            _id: '',
            batchID: '',
            batchQty: '',
            expiryDate: '',
            initialBatchQty: element.batchQty,
        });
    };

    const handleInputChange = (key, value) => {
      if (key === 'batchQty') {
        // Check if the value is empty or a positive number
        if ((!isNaN(parseFloat(value)) && parseFloat(value) >= 0)) {
          // If the value is empty or a positive number, update the state
          setItemData({ ...itemData, [key]: value });
        } else {
          alert('Invalid input: Please enter a valid non-negative numeric value.');
        }
      } else {
        // For other fields, update the state directly
        setItemData({ ...itemData, [key]: value });
      }
        console.log(itemData);
      };
      const updateBatch = () => {
        fetch("https://billing-360-dev.onrender.com/api/inventory/updateBatch", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(itemData),
        })
          .then((result) => {
            alert("Batch UPDATED");
            //resetFields();
            // handlePageUpdate();
            //addProductModalSetting();
            on_Cancel();
          })
          .catch((err) => console.log(err));
      };
      const handleCancel = () => {
        on_Cancel();
        //resetFields();
      };
      
  return (
    isVisible && (
      <div>
      <div className="blur-container-batch" />
      
      {/* Dialog background */}
      <div className="dialog-background-batch" style={{ top:'150px'}}>
      <dialog open id="addItemDialog" style={{ height: '150px', width: '600px', marginLeft: '100px' }}>

        <form onSubmit={(e) => { e.preventDefault();  }}>
          <table>
            
            <tbody>
            <tr>
              <td><input type="text" id="batch-id" autocomplete="one-time-code" value={`Batch Id : ${itemData.batchID}`} readOnly
                               /></td>
              <td><input type="number" id="item-id" autocomplete="one-time-code" placeholder="Batch Qty" value={itemData.batchQty} name="batchQty" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              } /></td>
              <td><input type="text" id="expiry date" autocomplete="one-time-code"  value= {`Batch Expiry Date :  ${itemData.expiryDate}`} 
                               readOnly  className="read-only-input"/></td>
            </tr>
            
            </tbody>
          </table>

          <button type="submit" style={{ marginLeft: '50px' }} onClick={updateBatch}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      </dialog>
      </div>
    </div>
    )
  );
};

export default UpdateBatchDialog;
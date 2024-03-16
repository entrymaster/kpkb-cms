import React,{useState,useEffect} from 'react';
import './AddProduct.css'
const AddBatchDialog = ({ isVisible, onCancel, element,handlePageUpdate, }) => {

    useEffect(() => {
        setItemData((prevItemData) => ({
          ...prevItemData,
          _id: element,
        //   batchID: element,
        }));
      }, [element]);

    const [itemData, setItemData] = useState({
         _id: element,
        batchID: '',
        batchQty: '',
        expiryDate: '',
      });

     console.log(element);
     
    const handleInputChange = (key, value) => {
      if ( (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)) {
        // If the value is empty or a valid number, update the state and previousValidValue
        setItemData({ ...itemData, [key]: value });
      } else {
        // If the value is not valid, revert to the previous valid value
        // Update the input field with the previous valid value
   
        // Show an alert box or any other indication of invalid input
        alert('Invalid input: Please enter a valid non-negative numeric value.');
      }
        console.log(itemData);
      };
      const addBatch = () => {
        const { batchID, batchQty, expiryDate } = itemData; // Destructure itemData
      
        fetch("http://localhost:5050/api/inventory/addBatchList", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            _id: element, // Assuming element is the product ID
            batchID,
            batchQty,
            expiryDate,
          }),
        })
          .then((result) => {
            if (result.ok) {
              alert("Batch ADDED");
              handlePageUpdate();
              onCancel();
              setItemData({
                _id: element,
                batchID: '',
                batchQty: '',
                expiryDate: '',
              });
            } else {
              alert("Failed to add batch");
            }
          })
          .catch((err) => console.log(err));
      };
      const handleCancel = () => {
        onCancel();
        setItemData({
          _id: element,
          batchID: '',
          batchQty: '',
          expiryDate: '',
        });
        
      };
    
      useEffect(() => {
        console.log("Updated itemData:", itemData);
      }, [itemData]);
  return (
    isVisible && (
      <div>
      <div className="blur-container-batch" />
      
      {/* Dialog background */}
      <div className="dialog-background-batch">
      <dialog open id="addItemDialog" style={{height:'250px'}}>
        <form onSubmit={(e) => { e.preventDefault();  }}>
          <table style={{ width: '100%' ,height:'110px'}}>
            
            <tbody>
            <tr>
              <td><input type="text" id="item-name" placeholder="batchID" value={itemData.batchID} name="batchID" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              } /></td>
              <td><input type="text" id="item-id" placeholder="batchQty" value={itemData.batchQty} name="batchQty" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              } /></td>
            </tr>
            <tr>
              <td><input type="date" id="expiryDate" placeholder="expiryDate" value={itemData.expiryDate} name="expiryDate" onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }/></td>
            </tr>
            </tbody>
          </table>

          <button type="submit" onClick={addBatch}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      </dialog>
      </div>
    </div>
    )
  );
};

export default  AddBatchDialog ;
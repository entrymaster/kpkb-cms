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
        setItemData({ ...itemData, [key]: value });
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
            } else {
              alert("Failed to add batch");
            }
          })
          .catch((err) => console.log(err));
      };
      useEffect(() => {
        console.log("Updated itemData:", itemData);
      }, [itemData]);
  return (
    isVisible && (
      <dialog open id="addItemDialog">
        <form onSubmit={(e) => { e.preventDefault();  }}>
          <table>
            
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
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      </dialog>
    )
  );
};

export default  AddBatchDialog ;
import React,{useState,useEffect} from 'react';
import './AddProduct.css'
import { Link } from "react-router-dom";
const UpdateBatchDialog = ({ isVisible, onCancel, batches, }) => {
    useEffect(() => {
        setBatchList(batches);
        
      }, [batches]
      );
//     const [batchList, setBatchList] = useState({
//         batchList:[{ batchID:'',batchQty:'',expiryDate:'', _id:''}],

// });
const [batchList, setBatchList] = useState(batches);
     console.log(batches);
    const handleInputChange = (key, value) => {
      setBatchList({ ...batchList, [key]: value });
        console.log(batchList);
      };
    //   const addBatch = () => {
    //     const { batchID, batchQty, expiryDate } = batchList; // Destructure itemData
      
    //     fetch("http://localhost:5050/api/inventory/updateBatchList", {
    //       method: "POST",
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         _id: id, // Assuming element is the product ID
    //         batchID,
    //         batchQty,
    //         expiryDate,
    //       }),
    //     })
    //       .then((result) => {
    //         if (result.ok) {
    //           alert("Batch ADDED");
    //           //handlePageUpdate();
    //           onCancel();
    //         } else {
    //           alert("Failed to add batch");
    //         }
    //       })
    //       .catch((err) => console.log(err));
    //   };
      useEffect(() => {
        console.log("Updated itemData:", batchList);
      }, [batchList]);
  return (
    isVisible && (
      <dialog open id="addItemDialog">
        <form onSubmit={(e) => { e.preventDefault();  }}>
          <table>
          <thead>
          <tr class="headers">
          <th>BATCH ID</th>
            <th>ITEM NAME</th>
            <th>BATCH EXPIRY</th>
            <th>BATCH QUANTITY</th>
            <th>MORE ACTIONS</th>
          </tr>
        </thead>
            <tbody>

            {/* <tr>
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
            </tr> */}
            {batchList && batchList.map((element, index) => {
      return (
        <tr key={index}>
          <td>{element.batchID}</td>
          <td>{element.batchQty}</td>
          <td>{element.expiryDate}</td>
          {/* <td>{element.costPrice}</td>
          <td>{element.quantity }</td> */}
           <td>
            <span
              //className="text-green-700 cursor-pointer"
              //onClick={() => updateProductModalSetting(element)}
            >
              Edit{" "}
            </span>
            <span
              //className="text-green-700 cursor-pointer"
              //onClick={() => addBatchModalSetting(element)}
            >
              AddBatch{" "}
            </span>
            <span
              //className="text-green-700 cursor-pointer"
              //onClick={() => updateBatchModalSetting(element)}
            >
              EditBatch{" "}
            </span>
            <span
              //className="text-red-600 px-2 cursor-pointer"
              //onClick={() => deleteItem(element._id)}
            >
              {/* <DeleteIcon
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={() => deleteItem(element._id)}
                /> */}
            </span>
          </td> 
        </tr>
      );
    })}
            </tbody>
          </table>

          {/* <button type="submit" onClick={addBatch}>Save</button> */}
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      </dialog>
    )
  );
};

export default  UpdateBatchDialog ;
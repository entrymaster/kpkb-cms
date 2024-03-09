import React, { useState, useEffect } from "react";
import "./AddProduct.css";
import { Link } from "react-router-dom";
import UpdateBatchDialog from '../components/UpdateBatch';
import DeleteIcon from "@mui/icons-material/Delete";

const ViewBatchDialog = ({ isVisible, onCancel, batches, id }) => {
  const productId = id;
  const [updateBatch, setUpdateBatch] = useState([]);
  const [isUpdateBatchDialogVisible, setUpdateBatchDialogVisibility] =
    useState(false);
  const [updatePage, setUpdatePage] = useState(true);
  useEffect(() => {
    setBatchList(batches);
  }, [batches]);

  //     const [batchList, setBatchList] = useState({
  //         batchList:[{ batchID:'',batchQty:'',expiryDate:'', _id:''}],

  // });
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  const [batchList, setBatchList] = useState(batches);
  console.log(batches);
  const handleInputChange = (key, value) => {
    setBatchList({ ...batchList, [key]: value });
    console.log(batchList);
  };
  const toggleUpdateBatchDialog = () => {
    setUpdateBatchDialogVisibility(!isUpdateBatchDialogVisible);
    console.log({ isUpdateBatchDialogVisible });
  };

  const updateBatchModalSetting = (selectedProductData) => {
    console.log("Clicked: edit");
    setUpdateBatch(selectedProductData);
    toggleUpdateBatchDialog();
  };
  useEffect(() => {
    console.log("Updated itemData:", batchList);
  }, [batchList]);
  return (
    isVisible && (
      <dialog open id="addItemDialog">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <UpdateBatchDialog
            isVisible={isUpdateBatchDialogVisible}
            onCancel={toggleUpdateBatchDialog}
            element={updateBatch}
            id = {productId}
          />
          <table>
            <thead>
              <tr class="headers">
                <th>BATCH ID</th>
                {/* <th>ITEM NAME</th> */}
                <th>BATCH QUANTITY</th>
                <th>BATCH EXPIRY</th>

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
              {batchList &&
                batchList.map((element, index) => {
                  return (
                    <tr key={index}>
                      <td>{element.batchID}</td>
                      <td>{element.batchQty}</td>
                      <td>{element.expiryDate}</td>
                      {/* <td>{element.costPrice}</td>
          <td>{element.quantity }</td> */}
                      <td>
                        {/* <span
              //className="text-green-700 cursor-pointer"
              //onClick={() => updateProductModalSetting(element)}
            >
              Edit{" "}
            </span> */}
                        {/* <span
              //className="text-green-700 cursor-pointer"
              //onClick={() => addBatchModalSetting(element)}
            >
              AddBatch{" "}
            </span> */}
                        <span
                        //className="text-green-700 cursor-pointer"
                        onClick={() => updateBatchModalSetting(element)}
                        >
                          EditBatch{" "}
                        </span>
                        <span
                        //className="text-red-600 px-2 cursor-pointer"
                        //onClick={() => deleteItem(element._id)}
                        >
                          <DeleteIcon
                            style={{ color: "red", cursor: "pointer" }}
                            //onClick={() => deleteItem(element._id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          {/* <button type="submit" onClick={addBatch}>Save</button> */}
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </dialog>
    )
  );
};

export default ViewBatchDialog;

import React, { useState, useEffect } from "react";
import "./AddProduct.css";
import { Link } from "react-router-dom";
import UpdateBatchDialog from '../components/UpdateBatch';
import DeleteIcon from "@mui/icons-material/Delete";

const ViewBatchDialog = ({ isVisible, onCancel, batches, id }) => {
  const productId = id;
  const [updateBatch, setUpdateBatch] = useState([]);
  const [isUpdateBatchDialogVisible, setUpdateBatchDialogVisibility] = useState(false);
  const [updatePage, setUpdatePage] = useState(true);
  const [batchList, setBatchList] = useState(batches);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [batchIdToDelete, setBatchIdToDelete] = useState(null);

  useEffect(() => {
    setBatchList(batches);
  }, [batches]);

  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  const deleteBatch = (Batchid) => {
    console.log("Batch ID: ", Batchid);
    setBatchIdToDelete(Batchid);
    setConfirmationOpen(true);
  
  };

  const confirmDelete = () => {
    // Call the deleteBatch function when the user confirms
    fetch(`http://localhost:5050/api/inventory/deleteBatch/${id}/${batchIdToDelete}`, {
      method: 'GET', // or 'DELETE' depending on your server implementation
    })
      .then((response) => response.json())
      .then((data) => {
        setUpdatePage(!updatePage);
        setConfirmationOpen(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleInputChange = (key, value) => {
    setBatchList({ ...batchList, [key]: value });
  };

  const toggleUpdateBatchDialog = () => {
    setUpdateBatchDialogVisibility(!isUpdateBatchDialogVisible);
  };
  


  const updateBatchModalSetting = (selectedProductData) => {
    console.log("Clicked: edit");
    setUpdateBatch(selectedProductData);
    toggleUpdateBatchDialog();
  };

  return (
    isVisible && (
      <dialog open id="addItemDialog" >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <UpdateBatchDialog
            isVisible={isUpdateBatchDialogVisible}
            onCancel={toggleUpdateBatchDialog}
            element={updateBatch}
            id={productId}
          />
          {isConfirmationOpen && (
            
            <div className="confirmation-dialog">
              <p>Are you sure you want to delete this batch?</p>
              <button onClick={confirmDelete}
             style={{ marginLeft: '20px' }} >Yes</button>
              <button onClick={() => setConfirmationOpen(false)}>No</button>
            </div>
          )}

          <table  id="inventoryTable">
            <thead>
              <tr className="headers">
                <th>BATCH ID</th>
                <th>BATCH QUANTITY</th>
                <th>BATCH EXPIRY</th>
                <th>MORE ACTIONS </th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {batchList &&
                batchList.map((element, index) => {
                  return (
                    <tr key={index}>
                      <td>{element.batchID}</td>
                      <td>{element.batchQty}</td>
                      <td>{element.expiryDate}</td>
                      <td>
                        <span
                          className="action-button"
                          onClick={() => updateBatchModalSetting(element)}
                        >
                          EditBatch{" "}
                        </span>
                        </td>
                        <td>
                        <span>
                          <DeleteIcon
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => deleteBatch(element._id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </dialog>
    )
  );
};

export default ViewBatchDialog;

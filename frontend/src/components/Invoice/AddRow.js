import React,{useState} from 'react';
import './AddRow.css';
const AddRowDialog = ({showDialog, onCancel}) => {
    const [rowData, setRowData]=useState({
        userID:'user',
        itemName:'',
        itemID:'',
        itemQuantity:0,
        itemDisc:0,
        itemRate:0,
        itemAmt:0,
    })
    const handleInputChange = (key, value) => {
        setRowData({ ...rowData, [key]: value });
        // console.log(rowData);
    };
    const addRow = () => {
        fetch("http://localhost:5000/api/invoice/add", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(rowData),
        })
            .then((result) => {
                alert("Row Added");
                onCancel();
            })
            .catch((err) => console.log(err));
    };
    return (
        showDialog && (
            // <dialog id="addNewItemDialog">
            <form onSubmit={(e) => { e.preventDefault();  }}>
            <table>
              <tbody>
              <tr>
                <td><input type="text" id="item-name" placeholder="Item Name" value={rowData.itemName} name="itemName" onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                }/></td>
                <td><input type="number" id="quantity" placeholder="Quantity" value={rowData.itemQuantity} name="itemQuantity" onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                }/></td>
              </tr>
              <tr>
                <td><input type="text" id="item-id" placeholder="Item ID" value={rowData.itemID} name="itemID" onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                }/></td>
                <td><input type="number" id="item-rate" placeholder="Item Rate" value={rowData.itemRate} name="itemRate" onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                }/></td>
              </tr>
              <tr>
                <td><input type="number" id="item-disc" placeholder="Item Discount" value={rowData.itemDisc} name="itemDisc" onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                }/></td>
                <td><input type="number" id="item-amt" placeholder="Item Amount" value={rowData.itemAmt} name="itemAmt" onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                }/></td>
              </tr>

              </tbody>
            </table>
  
            <button type="submit" onClick={addRow}>Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </form>
            // </dialog>
        )
    )
}

export default AddRowDialog;

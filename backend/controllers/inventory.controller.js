const Product = require("../models/inventory.model");

// Add Post
const addProduct = async (req, res) => {
  console.log("req: ", req.body.userID);
  const addProduct = new Product({
    userID: req.body.userID,
    itemID: req.body.itemID,
    itemName: req.body.itemName,
    salePrice: req.body.salePrice,
    costPrice: req.body.costPrice,
    itemGST: req.body.itemGST,
    category: req.body.category,
    discount: req.body.discount,
    quantity: req.body.quantity,
    //batchList: req.body.batchList,
  });
  addProduct
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
};
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.body._id},
      {
        costPrice: req.body.costPrice,
        salePrice: req.body.salePrice,
        itemGST: req.body.itemGST,
      },
      { new: true }
    );
    console.log(updatedProduct);
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(402).send("Error");
  }
};
// const updateBatch = async (req, res) => {
//   try {
//     const { batchID, batchQty, expiryDate } = req.body;

//     const updatedBatch = await Product.findOneAndUpdate(
//       { "batchList._id": req.body._id }, // Find the product with the matching batchList _id
//       { 
//         $set: {
//           "batchList.$.batchID": batchID,
//           "batchList.$.batchQty": batchQty,
//           "batchList.$.expiryDate": expiryDate,
//         }
//       },
//       { new: true }
//     );

//     console.log(updatedBatch);
//     res.json(updatedBatch);
//   } catch (error) {
//     console.log(error);
//     res.status(402).send("Error");
//   }
// };
const updateBatch = async (req, res) => {
  try {
    const { batchID, batchQty, expiryDate, _id, _idProduct, initialBatchQty } = req.body;

    // Find the initial batchQty
    
    

    // Find the difference (new batchQty - initial batchQty)
    const quantityDifference = batchQty - initialBatchQty;

    // Update the batch
    const updatedBatch = await Product.findOneAndUpdate(
      { "batchList._id": _id }, // Find the product with the matching batchList _id
      { 
        $set: {
          "batchList.$.batchID": batchID,
          "batchList.$.batchQty": batchQty,
          "batchList.$.expiryDate": expiryDate,
        }
      },
      { new: true }
    );

    // Increment the quantity by the difference (p) using MongoDB's incrementer
    await Product.findByIdAndUpdate(_idProduct, { $inc: { quantity: quantityDifference } });

    console.log(updatedBatch);
    res.json(updatedBatch);
  } catch (error) {
    console.log(error);
    res.status(402).send("Error");
  }
};

const getAllProducts = async (req, res) => {
  const findAllProducts = await Product.find({
    //userID: req.params.userID,
    userID: "user",
  }).sort({ itemName: 1 }); 
  // -1 for descending;
  res.json(findAllProducts);
  //console.log(findAllProducts);
};

// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find({ userID: "user" });

//     // Loop through each product and calculate the total quantity
//     products.forEach(product => {
//       let totalQuantity = 0;
//       product.batchList.forEach(batch => {
//         totalQuantity += batch.batchQty;
//       });
//       product.quantity = totalQuantity;
//       // Save the updated product with the new quantity
//       product.save();
//     });

//     res.json(products);
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
const searchProduct = async (req, res) => {
  try {
    const { userID, itemName } = req.query;

    // Create a query object based on parameters
    const query = {
      userID: req.params.userID,
      itemName: { $regex: new RegExp(itemName, 'i') }, // Case-insensitive string search
    };

    // Execute the query
    const records = await Product.find(query);

    // Send the results
    res.json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteProduct =  async (req, res) => {
  const deleteProduct = await Product.deleteOne(
    { _id: req.params.id }
  );
  res.json({ deleteProduct});
};
const deleteBatch = async (req, res) => {
  const { id, Batchid } = req.params; // Use _id instead of id

  try {
    // Find the product in the inventory
    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Find the batch in the product's batchList
    const batch = product.batchList.find((batch) => batch._id == Batchid);

    if (!batch) {
      return res.status(404).json({ error: 'Batch not found' });
    }

    // Decrease the product's quantity by the batchQty
    product.quantity -= batch.batchQty;

    // Remove the batch from the batchList
    product.batchList = product.batchList.filter(
      (batch) => batch._id != Batchid
    );

    // Save the updated product
    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error deleting batch:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const addBatchList = async (req, res) => {
  try {
    const { batchID, batchQty, expiryDate } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.body._id },
      // 
      { 
        $push: { batchList: { batchID, batchQty, expiryDate } },
        $inc: { quantity: batchQty } // Increment the stock by batchQty
      },
      
      { new: true }
    );
    console.log(Product);
    res.json({ message: 'BatchList added successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error adding batchList', message: error.message });
  }
};
/*const updateBatchList = async (req, res) => {
  try {
    const { batchId, batchQty, expiryDate } = req.body;
    const _id = req.body._id;

    // Check if the product with the given ID exists
    const existingProduct = await Product.findById(_id);

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found'});
    }

    // Find the batch with the given batchId within the batches array
    const targetBatchIndex = existingProduct.batches.findIndex(batchList => batchList.batchId === batchId);

    if (targetBatchIndex === -1) {
      return res.status(404).json({ error: 'Batch not found'});
    }

    // Update the target batch
    existingProduct.batches[targetBatchIndex] = {
      ...existingProduct.batches[targetBatchIndex],
      batchQty,
      expiryDate,
    };

    // Save the updated product
    const updatedProduct = await existingProduct.save();

    res.json({ message: 'Batch updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating batch:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};*/
/*const updateItemQuantityInInvoice = async (req, res) => {
  try {
    const { itemName, requestedQuantity } = req.body;

    const inventoryItem = await Inventory.findOne({ 'itemName': itemName });

    if (!inventoryItem) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }

    for (let batch of inventory.item.batchList) {
      const availableQuantity = batchList.batchQty;

      // If the requested quantity is less than or equal to the available quantity in the current batch
      if (remainingQuantity <= availableQuantity) {
        batchList.batchQty -= remainingQuantity;
        remainingQuantity = 0; // Requested quantity fulfilled
      } else {
        // Move to the next batch
        batchList.batchQty = 0;
        remainingQuantity -= availableQuantity;
      }

      // If the updated quantity is 0, remove the batch from the batchList
      if (batchList.batchQty === 0) {
        inventory.items[itemIndex].batchList = inventory.items[itemIndex].batchList.filter(b => b.expiry !== batch.expiry);
      }

      if (remainingQuantity === 0) {
        break; // Exit the loop as the quantity has been updated
      }
    }

    if (remainingQuantity > 0) {
      return res.status(400).json({ error: `Insufficient quantity in batchList for ${itemName}. Requested ${requestedQuantity}, available ${requestedQuantity - remainingQuantity}.` });
    }

    const updatedInvoice = await invoice.save();

    res.json({ message: 'Item quantity in the inventory updated successfully', inventory: updatedInventory });
  } catch (error) {
    console.error('Error updating item quantity in invoice:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};*/

module.exports={
  addProduct, 
  updateProduct,
  getAllProducts,
  searchProduct,
  deleteProduct,
  addBatchList,
  updateBatch,
  deleteBatch 
  //updateItemQuantityInInvoice
   };
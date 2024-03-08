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
const getAllProducts = async (req, res) => {
  const findAllProducts = await Product.find({
    //userID: req.params.userID,
    userID: "user",
  }).sort({ itemName: 1 }); 
  // -1 for descending;
  res.json(findAllProducts);
  //console.log(findAllProducts);
};

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


module.exports={
  addProduct, 
  updateProduct,
  getAllProducts,
  searchProduct,
  deleteProduct,
  addBatchList,
   };
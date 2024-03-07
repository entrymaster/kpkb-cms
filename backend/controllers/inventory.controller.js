const Product = require("../models/inventory.model");

// Add Post
const addProduct = async (req, res) => {
  console.log("req: ", req.body.userId);
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
    // batchList: req.body.batchList,
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

const getAllProducts = async (req, res) => {
  const findAllProducts = await Product.find({
    //userID: req.params.userID,
    userID: "user",
  }).sort({ itemName: 1 }); 
  // -1 for descending;
  res.json(findAllProducts);
  console.log(findAllProducts);
}
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
      { $push: { batchList: { batchID, batchQty, expiryDate } } },
      { new: true }
    );
    res.json({ message: 'BatchList added successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error adding batchList', message: error.message });
  }
};


module.exports={addProduct,getAllProducts,deleteProduct,addBatchList};
//controller
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


module.exports={addProduct};

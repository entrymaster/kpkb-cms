const Row = require("../models/invoice.model");

// Add Post
const addRow = async (req, res) => {
    console.log("req: ", req.body.userId);
    const addRow = new Row({
      userID: req.body.userID,
      itemID: req.body.itemID,
      itemName: req.body.itemName,
      itemDisc: req.body.itemDisc,
      item: req.body.quantity,
      // batchList: req.body.batchList,
    });
  
    addRow
      .save()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(402).send(err);
      });
  };

module.exports={addRow};
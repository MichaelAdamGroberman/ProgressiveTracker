const router = require("express").Router();
const Transaction = require("../models/transaction.js");

router.get("/api/transaction", (req, res) => {
  Transaction.find({})
    .sort({ date: -1 })
    .then(database_transaction => {
      res.json(database_transaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/transaction/bulk", ({ body }, res) => {
  Transaction.insertMany(body)
    .then(database_transaction => {
      res.json(database_transaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
router.post("/api/transaction", ({ body }, res) => {
  Transaction.create(body)
    .then(database_transaction => {
      res.json(database_transaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});



module.exports = router;

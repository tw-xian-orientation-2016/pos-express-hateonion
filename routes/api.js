"use strict";
let express = require('express');
let db = require('./dbOperation.js');

let router = express.Router();

router.get('/productsInfo', (req, res) => {
  db.getProductInfo((data) => {
    res.send(JSON.stringify(data[0].items));
  });
});

router.get('/cartItems', (req, res) => {
  db.getCart((data) => {
    res.json(data);
  });
});

router.get('/receipts', (req, res) => {
  db.getReceiptList((data) => {
    res.json(data);
  });
});

router.post('/cartItems', (req, res) => {
  db.addNewItem(req.body.id);
  res.send('success');
});

router.put('/cartItems', (req, res) => {
  db.updateCart(req.body.id);
  res.send('success');
});



router.delete('/cartItems', (req, res) => {
  db.deleteCart(req.body.id);
});

router.delete('/cart', (req, res) => {
  db.cleanCart();
});

router.post('/receipts', (req, res) => {
  db.addReceipt(req.body.cart, req.body.total);
  res.send('success');
});

router.delete('/receipts', (req, res) => {
  console.log(req.body.timeStamp);
  db.deleteReceipt(req.body.timeStamp);
  res.send('success');
});



module.exports = router;

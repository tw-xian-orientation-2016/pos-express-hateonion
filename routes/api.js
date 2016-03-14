"use strict";
let express = require('express');
let db = require('./dbOperation.js');

let router = express.Router();

router.get('/getProductInfo', (req, res) => {
  db.getProductInfo((data) => {
    res.send(JSON.stringify(data[0].items));
  });
});

router.get('/getCart', (req, res) => {
  db.getCart((data) => {
    res.json(data);
  });
});

router.get('/getReceiptList', (req, res) => {
  db.getReceiptList((data) => {
    res.json(data);
  });
});

router.get('/dbinit', (req, res) => {
  db.init();
});

router.post('/addItem', (req, res) => {
  db.addNewItem(req.body.id);
  res.send('success');
});

router.post('/selfAdd', (req, res) => {
  db.selfAdd(req.body.id);
  res.send('success');
});


router.post('/updateCart', (req, res) => {
  db.updateCart(req.body.id, req.body.count);
});

router.post('/deleteCart', (req, res) => {
  db.deleteCart(req.body.id);
});

router.get('/cleanCart', (req, res) => {
  db.cleanCart();
});

router.post('/addReceipt', (req, res) => {
  db.addReceipt(req.body.cart, req.body.total);
  res.send('success');
});

router.post('/deleteReceipt', (req, res) => {
  console.log(req.body.timeStamp);
  db.deleteReceipt(req.body.timeStamp);
  res.send('success');
});



module.exports = router;

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
    console.log(data);
    res.json(data);
  });
});

router.get('/getReceiptList', (req, res) => {
  res.send(JSON.stringify(receiptList));
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


module.exports = router;

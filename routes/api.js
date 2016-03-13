"use strict";
let express = require('express');
let router = express.Router();
let productInfo = { items:[
    {
      id : "item001",
      name : "苹果",
      price : "3.00",
      unit : "斤"
    },
    {
      id : "item002",
      name : "可乐",
      price : "4.00",
      unit : "瓶"
    },
    {
      id : "item003",
      name : "火腿肠",
      price : "2.00",
      unit : "根"
    }
  ]};

let cart = [
      {
        id: "item001",
        count: 3
      },
      {
        id: "item002",
        count: 4
      }
    ];


let receiptList = [
      {
        time : "11111",
        total: "123"
      },
      {
        time : "22222",
        total : "456"
      }];

router.get('/getProductInfo', (req, res) => {
  res.send(JSON.stringify(productInfo));
});

router.get('/getCart', (req, res) => {
  res.send(JSON.stringify(cart));
});

router.get('/getReceiptList', (req, res) => {
  res.send(JSON.stringify(receiptList));
});

module.exports = router;

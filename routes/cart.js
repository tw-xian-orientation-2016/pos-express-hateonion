"use strict";
let express = require('express');
let router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cart', {
    items:[
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
    ],
    cart:[
      {
        id: "item001",
        count: 3
      },
      {
        id: "item002",
        count: 4
      }
    ]
  });
});

module.exports = router;

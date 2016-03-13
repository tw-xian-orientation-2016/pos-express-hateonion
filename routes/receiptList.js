"use strict";
let express = require('express');
let router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('receiptList', {
    receiptList:[
      {
        time : "11111",
        total: "123"
      },
      {
        time : "22222",
        total : "456"
      }]
  });
});

module.exports = router;

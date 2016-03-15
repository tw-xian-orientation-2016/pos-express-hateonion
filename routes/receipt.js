"use strict";
let express = require('express');
let router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('./public/html/receipt.html');
});

module.exports = router;

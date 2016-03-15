"use strict";
let express = require('express');
let router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
  res.sendfile('./public/html/cart.html');
});

module.exports = router;

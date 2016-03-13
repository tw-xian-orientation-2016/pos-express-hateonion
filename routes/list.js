"use strict";
let express = require('express');
let router = express.Router();

router.get('/', function (req, res) {
  res.sendfile('./public/html/list.html');
});

module.exports = router;

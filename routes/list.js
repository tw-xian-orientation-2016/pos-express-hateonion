"use strict";
let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
  res.sendfile('./public/html/list.html');
});

module.exports = router;

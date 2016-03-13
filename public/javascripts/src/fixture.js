function getProductInfo() {
  $.ajaxSetup({
    async : false
  });
  var productInfo;

  $.get('/api/getProductInfo', function(data){
    productInfo = data.items;
  }, 'json');

  return productInfo;
}

function getCart() {
  $.ajaxSetup({
    async : false
  });
  var cart;

  $.get('/api/getCart', function(data){
    cart = data;
  }, 'json');

  return cart;
}

function getReceiptList() {
  $.ajaxSetup({
    async : false
  });
  var receiptList;

  $.get('/api/getReceiptList', function(data){
    receiptList = data;
  }, 'json');

  return receiptList;
}

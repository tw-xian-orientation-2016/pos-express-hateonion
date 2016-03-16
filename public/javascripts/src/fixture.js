function getProductInfo(callback) {

  $.get('/api/productsInfo', function(data){
    if(callback){
      callback(data);
    }
  }, 'json');

}

function getCart(callback) {

  $.get('/api/cartItems', function(data){
    if(callback) {
      callback(data);
    }
  }, 'json');
}

function getReceiptList(callback) {

  $.get('/api/receipts', function(data){
    if(callback) {
      callback(data);
    }
  }, 'json');

}

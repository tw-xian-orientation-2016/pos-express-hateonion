function getProductInfo(callback) {

  $.get('/api/productsInfo', function(data){
    if(callback){
      callback(data);
    }
  }, 'json');

}

function getCart(callback) {

  $.get('/api/carts', function(data){
    if(callback) {
      callback(data);
    }
  }, 'json');
}

function getReceiptList(callback) {

  $.get('/api/receiptsList', function(data){
    if(callback) {
      callback(data);
    }
  }, 'json');

}

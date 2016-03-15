function getProductInfo(callback) {

  $.get('/api/getProductInfo', function(data){
    if(callback){
      callback(data);
    }
  }, 'json');

}

function getCart(callback) {

  $.get('/api/getCart', function(data){
    if(callback) {
      callback(data);
    }
  }, 'json');
}

function getReceiptList(callback) {

  $.get('/api/getReceiptList', function(data){
    if(callback) {
      callback(data);
    }
  }, 'json');

}

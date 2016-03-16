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

function selfAddcartItem(id, callback) {
  $.ajax({url: '/api/cartItems',
         data : {id : id},
         method: 'PUT'})
         .done(function() {
           callback();
         });
}

function createCartItem(id, callback) {
  $.post('/api/cartItems', {id : id}, function(){
    callback();
  });
}

function deleteCartItem(id)  {

  $.ajax({url: '/api/cartItems',
         data : {id : id},
         method: 'DELETE'});
}

function updateCartItem(id, number) {
  $.ajax({url: '/api/cartItems',
         data : {id : id, count: number},
         method: 'PUT'});

}

function createReceipt(total, cart) {

  $.post('/api/receipts', {total: total,cart: JSON.stringify(cart)}, function() {
    clearCart();
  });
}

function clearCart() {
  $.ajax({url: '/api/cart',
         method: 'DELETE'});
}

function deleteReceipt(timeStamp) {
  $.ajax({url: '/api/receipts',
         data : {timeStamp: timeStamp},
         method: 'DELETE'});
}

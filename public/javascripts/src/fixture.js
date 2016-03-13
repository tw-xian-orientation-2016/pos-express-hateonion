function hasThisItemInCart(id) {
  var carts = getLocalStorage('carts');
  var index;
  carts.forEach(function(cart, currentIndex) {
    if(cart.id === id) {
      index = currentIndex;
    }
  });
  return index;
}

function countTotal(carts) {
  var items = getLocalStorage("items");
  var total = 0;

  carts.forEach(function(cart) {
    items.forEach(function(item) {
      if(cart.id === item.id) {
        total += item.price * cart.count;
      }
    });
  });
  return total;
}


$(document).ready(function() {
  if(localStorage.length !== 0) {
    printTempReceipt();
  } else{
    printReceipt();
  }
});

function printReceipt() {
  getCart(function (cart){
    getProductInfo(function (items) {
      checkOutTime();
      printCarts(cart, items);
      var total = countTotal(cart, items);
      backButtonClick();
      $.post('/api/receipts', {total: total,cart: JSON.stringify(cart)}, function() {
        clearCart();
      });
    });
  });
}


function printTempReceipt() {
  getProductInfo(function (items) {
    backButtonClick();
    var cart = localStorage.getItem('tempCart');
    var timeStamp = localStorage.getItem('timeStamp');
    timeStamp = JSON.parse(timeStamp);
    cart = JSON.parse(cart);
    printTimeAndOperator(timeStamp);
    printCarts(cart, items);
  });
}

function generateTable(carts, items) {

  carts.forEach(function(cart) {
    items.forEach(function(item) {
      if(cart.id === item.id) {
        var htmlContext = "";
        htmlContext += "<tr>";
        htmlContext += "<td>" + item.name + "</td>";
        htmlContext += "<td>" + item.price + "</td>";
        htmlContext += "<td>" + cart.count + "</td>";
        htmlContext += "<td>" + item.price * cart.count + "元</td>";
        htmlContext += "</tr>";
        $("table").append(htmlContext);
      }
    });
  });
}


function countTotal(carts, items) {
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


function checkOutTime() {
  var myDate = new Date();
  var time = myDate.toLocaleString();
  $("#time").text("时间:" + time);
  $("#operator").text("操作员：老司机");
}


function printTimeAndOperator(timeStamp) {
  var myDate = new Date(timeStamp);
  var time = myDate.toLocaleString();
  $("#time").text("时间:" + time);
  $("#operator").text("操作员：老司机");
}


function printCarts(carts, items) {
  var sumContext = "";

  generateTable(carts, items);
  var total = countTotal(carts, items);
  sumContext += "总计：";
  sumContext += total;
  sumContext += "元";
  $("#totalMoney").text(sumContext);
}


function clearCart() {
  $.ajax({url: '/api/cart',
         method: 'DELETE'});
}

function backButtonClick() {
  $("[name='back']").click(function() {
    localStorage.clear();
    document.location.href = '/';
  });
}

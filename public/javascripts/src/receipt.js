$(document).ready(function() {
  printReceipt();
  // generateReceipt();
  // clearCart();
  // backButtonClick();
});

function printReceipt() {
  getCart(function (cart){
    getProductInfo(function (items) {
      printCarts(cart, items);
      let total = countTotal(cart, items);
      backButtonClick();
      $.post('/api/addReceipt', {total: total,cart: JSON.stringify(cart)}, function() {
        clearCart();
      });
    });
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


function getLocalTime() {
  var myDate = new Date();
  var time = myDate.toLocaleString();
  return time;
}


function printTimeAndOperator() {
  var time = getLocalTime();
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

function printDetail() {
  var tempCarts = getLocalStorage("tempCarts");

  if(tempCarts.length === 0){
    printCarts();
  } else{
    printTempCart();
  }
}

function generateReceipt() {

  printTimeAndOperator();
  printDetail();

}


function clearCart() {
  $.get('/api/cleanCart');
}

function backButtonClick() {
  $("[name='back']").click(function() {
    document.location.href = '/';
  });
}

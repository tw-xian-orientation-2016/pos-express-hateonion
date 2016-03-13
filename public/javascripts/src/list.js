$(document).ready(function() {
  init();
});

function init(){
  var productInfo = getProductInfo();
  var cart = getCart();
  var receiptList = getReceiptList();

  printDetail(productInfo);
  updateCartNumber(cart);
  updateReceiptNumber(receiptList);

}

function printDetail(items) {
  items.forEach(function(item) {
    var htmlContext = "";
    htmlContext += "<tr>";
    htmlContext += "<td>" + item.name + "</td>";
    htmlContext += "<td>" + item.price + "元/" + item.unit;
    htmlContext += "<td>" + "<button name='addButton' data-toggle='tooltip' title='添加商品' " + "data-itemId=" + item.id + " class='btn btn-default glyphicon glyphicon-plus'>" + "</button>" + "</td>";
    htmlContext += "</tr>";
    $("table").append(htmlContext);
  });
}

function updateReceiptNumber(receiptList) {
  var receiptNumber = "<div class='shouNumber'>" + receiptList.length + "</div>";
  $("[name='receiptListButton']").html(receiptNumber);
}

function updateCartNumber(cart) {
  var number= 0;
  cart.forEach(function(cartItem) {
    number += cartItem.count;
  });
  var cartNumber = '<div class="shouNumber">' + number + "</div>";
  $("[name='cartButton']").html(cartNumber);
}

function hasThisItemInCart(id, carts) {
  var carts = getLocalStorage('carts');
  var index;
  carts.forEach(function(cart, currentIndex) {
    if(cart.id === id) {
      index = currentIndex;
    }
  });
  return index;
}

function addButtonClick() {
  $("[name='addButton']").click(function() {
    var id = $(this).attr('data-itemId');
    var carts = getLocalStorage('carts');
    if(hasThisItemInCart(id)!== undefined) {
      var index = hasThisItemInCart(id);
      carts[index].count++;
    } else{
      carts.push({"id" : id, "count" : 1});
    }
    setLocalStorage("carts", carts);
    updateNumber();
  });
}

function cartButtonClick() {
  $("[name='cartButton']").click(function() {
    document.location.href = "cart.html";
  });
}

function hoverEffect() {
  $('[data-toggle="tooltip"]').tooltip();
}

function receiptListButtonClick() {
  $("[name='receiptListButton']").click(function() {
    document.location.href = "receiptList.html";
  });
}


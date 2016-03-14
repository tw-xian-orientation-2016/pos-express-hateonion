$(document).ready(function() {
  init();
});

function init(){
  var items,receiptList,cart;

  getProductInfo(function(data) {
    items = data;
    printDetail(items);
    addButtonClick();
    hoverEffect();
    cartButtonClick();
  });

  getCart(function(data) {
    cart = data;
    updateCartNumber(cart);
  });


  // getReceiptList(function(data) {
    // receiptList = data;
    // updateReceiptNumber(receiptList);
  // });


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
    number += parseInt(cartItem.count);
  });
  var cartNumber = '<div class="shouNumber">' + number + "</div>";
  $("[name='cartButton']").html(cartNumber);
}

function postId(id, data, index) {
  if(index !== undefined) {
    $.post('/api/selfAdd',{id : id}, function() {
      getCart(function (data) {
        updateCartNumber(data);
      });
    });
  } else{
    $.post('/api/addItem', {id : id}, function(){
      getCart(function(data) {
        updateCartNumber(data);
      });
    });
  }
}

function addButtonClick() {
  $("[name='addButton']").click(function() {
    var id = $(this).data('itemid');
    getCart(function(data) {
      var index;
      carts = data;
      carts.forEach(function(cart, currentIndex) {
        if(cart.id === id) {
          index = currentIndex;
        }
      });
      postId(id, data, index);
    });
  });
}


function cartButtonClick() {
  $("[name='cartButton']").click(function() {
    document.location.href = "./cart";
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


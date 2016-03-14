$(document).ready(function() {
  generateCart();
});

function generateCart() {
  getProductInfo(function (productInfo) {
    getCart(function (cart){
      printDetail(cart, productInfo);
      deleteButtonClick();
    });
  });
}

function printDetail(cart, items) {

  cart.forEach(function(cartItem) {
    items.forEach(function(item) {
      if(cartItem.id === item.id) {
        var htmlContext = "";
        htmlContext += "<tr>";
        htmlContext += "<td>" + item.name + "</td>";
        htmlContext += "<td id='price'>" + item.price + "元/" + item.unit + "</td>";
        htmlContext += "<td id='count'>" + cartItem.count + "</td>";
        htmlContext += "<td id='subtotal'>" + item.price * cartItem.count + "元</td>";
        htmlContext += "<td>" + "<input type='text' name='numberInput'" + "data-itemId=" + item.id +  "></td>";
        htmlContext += "<td>" + "<button name='deleteButton' " + "data-itemId=" + item.id + " class='btn btn-default glyphicon glyphicon-remove pull-left'>" + "</button>" + "</td>";
        htmlContext += "</tr>";
        $("table").append(htmlContext);
      }
    });
  });
}

function deleteButtonClick() {
  $("[name='deleteButton']").click(function() {
    var id = $(this).attr("data-itemId");
    $.post('/api/deleteCart',{id : id});
    $(this).parents("tr").remove();
    });
  }


function updateNumber() {
  $("[name='numberInput']").change(function() {
    var carts = getLocalStorage('carts');
    var id = $(this).attr("data-itemId");
    var number = $(this).val();
    var price = parseInt($(this).parent().prevAll('#price').text());

    carts.forEach(function(cart, index) {
      if(id === cart.id) {
        carts[index].count = number;
      }
    });
    $(this).parent().prevAll("#count").text(number);
    $(this).parent().prevAll("#subtotal").text(number * price + "元");
    setLocalStorage("carts", carts);
  });
}

function checkOutClick() {
  $("[name='checkout']").click(function() {
    document.location.href = 'receipt.html';
  });
}

function backButtonClick() {
  $("[name='back']").click(function() {
    document.location.href = 'list.html';
  });
}


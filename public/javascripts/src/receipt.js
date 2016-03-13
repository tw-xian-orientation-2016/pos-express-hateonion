function generateTable(carts) {
  var items = getLocalStorage("items");

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


function getLocalTime() {
  var myDate = new Date();
  var time = myDate.toLocaleString();
  return time;
}

function getTimeStamp() {
  var myDate = new Date();
  var timeStamp = myDate.getTime();
  return timeStamp;
}

function printTimeAndOperator() {
  var time = getLocalTime();
  $("#time").text("时间:" + time);
  $("#operator").text("操作员：老司机");
}

function printTempCart() {
  var tempCarts = getLocalStorage("tempCarts");
  var sumContext = "";

  var total = countTotal(tempCarts);
  sumContext += "总计：";
  sumContext += total;
  sumContext += "元";

  generateTable(tempCarts);

  $("#totalMoney").text(sumContext);
  setLocalStorage("tempCarts", []);
}

function printCarts() {
  var carts = getLocalStorage("carts");
  var receiptList = getLocalStorage("receiptList");
  var timeStamp = getTimeStamp();
  var sumContext = "";

  generateTable(carts);
  var total = countTotal(carts);
  sumContext += "总计：";
  sumContext += total;
  sumContext += "元";
  $("#totalMoney").text(sumContext);
  receiptList.push({time: timeStamp, total: total, carts: carts});
  setLocalStorage("receiptList", receiptList);
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
  setLocalStorage("carts", []);
}

function backButtonClick() {
  $("[name='back']").click(function() {
    document.location.href = 'list.html';
  });
}

$(document).ready(function() {
  generateReceipt();
  clearCart();
  backButtonClick();
});


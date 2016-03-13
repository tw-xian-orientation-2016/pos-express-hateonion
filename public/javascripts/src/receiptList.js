
function printReceiptList(){
  var receiptList = getLocalStorage("receiptList");

  receiptList.forEach(function(receipt) {
    var date = new Date(receipt.time);
    var time = date.toDateString();
    var htmlContext = "";
    htmlContext += "<tr>";
    htmlContext += "<td>" + time + "</td>";
    htmlContext += "<td>" + receipt.total + "元</td>";
    htmlContext += "<td>" + "<button name='getReceipt' " + "data-timeStamp=" + receipt.time + " class='btn btn-info glyphicon glyphicon-gift checkout'>" + "</button>" + "</td>";
    htmlContext += "<td>" + "<button name='deleteReceipt' " + "data-timeStamp=" + receipt.time + " class='btn btn-warning glyphicon glyphicon-remove delete'>" + "</button>" + "</td>";
    htmlContext += "</tr>";
    $("table").append(htmlContext);
  });
}

function backButtonClick() {
  $("[name='back']").click(function() {
    setLocalStorage("tempCarts", []);
    document.location.href = 'list.html';
  });
}

function getReciptButtonClick() {
  $("[name='getReceipt']").click(function() {
    var receiptList = getLocalStorage("receiptList");
    var timeStamp = $(this).attr('data-timeStamp');

    receiptList.forEach(function(receipt) {
      if(receipt.time === parseInt(timeStamp)) {
        setLocalStorage("tempCarts", receipt.carts);
      }
    });
    document.location.href = 'receipt.html';
  });
}

function deleteButtonClick() {
  $("[name='deleteReceipt']").click(function() {
    var receiptList = getLocalStorage('receiptList');
    var timeStamp = $(this).attr('data-timeStamp');

    receiptList.forEach(function(receipt, index) {
      if(receipt.time === parseInt(timeStamp)) {
        receiptList.splice(index, 1);
      }
    });
    setLocalStorage('receiptList', receiptList);
    $(this).parents("tr").remove();
  });
}
$(document).ready(function() {
  backButtonClick();
  printReceiptList();
  getReciptButtonClick();
  deleteButtonClick();
});

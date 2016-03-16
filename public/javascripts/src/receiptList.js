$(document).ready(function() {
  printReceiptList();
});

function printReceiptList() {
  getReceiptList(function(receiptList) {
    printDetail(receiptList);
    backButtonClick();
    getReciptButtonClick(receiptList);
    deleteButtonClick();
  });
}

function printDetail(receiptList){

  receiptList.forEach(function(receipt) {
    var date = new Date(receipt.timeStamp);
    var time = date.toDateString();
    var htmlContext = "";
    htmlContext += "<tr>";
    htmlContext += "<td>" + time + "</td>";
    htmlContext += "<td>" + receipt.total + "元</td>";
    htmlContext += "<td>" + "<button name='getReceipt' " + "data-timeStamp=" + receipt.timeStamp + " class='btn btn-info glyphicon glyphicon-gift checkout'>" + "</button>" + "</td>";
    htmlContext += "<td>" + "<button name='deleteReceipt' " + "data-timeStamp=" + receipt.timeStamp + " class='btn btn-warning glyphicon glyphicon-remove delete'>" + "</button>" + "</td>";
    htmlContext += "</tr>";
    $("table").append(htmlContext);
  });
}

function backButtonClick() {
  $("[name='back']").click(function() {
    localStorage.clear();
    document.location.href = '/';
  });
}

function getReciptButtonClick(receiptList) {
  $("[name='getReceipt']").click(function() {
    var timeStamp = $(this).attr('data-timeStamp');

    receiptList.forEach(function(receipt, index) {
      if(receipt.timeStamp === parseInt(timeStamp)) {
        localStorage.setItem('tempCart', receiptList[index].cart);
        localStorage.setItem('timeStamp', receiptList[index].timeStamp);

      }
    });
    document.location.href = './receipt';
  });
}

function deleteButtonClick() {
  $("[name='deleteReceipt']").click(function() {
    var timeStamp = $(this).attr('data-timeStamp');
    deleteReceipt(timeStamp);
    $(this).parents("tr").remove();
  });
}

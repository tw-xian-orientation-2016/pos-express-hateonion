'use strict';

let mongoose = require('mongoose');

let productSchema = new mongoose.Schema(
  {
    items: [
      {
        name : String,
        id : String,
        unit : String,
        price : String
      },
      {
        name : String,
        id : String,
        unit : String,
        price : String
      },
      {
        name : String,
        id : String,
        unit : String,
        price : String
      }
    ]
  });

let productModel = mongoose.model('Product', productSchema);

let cartSchema = new mongoose.Schema({ count : String, id : String });
let cartModel = mongoose.model('Cart', cartSchema);

let receiptSchema = new mongoose.Schema({total: String, timeStamp:Number, cart: []});
let receiptListModel = mongoose.model('ReceiptList', receiptSchema);

function init() {
  let productInfo = new productModel
  (
    {
      items :[
        {
          id : "item001",
          name : "苹果",
          price : "3.00",
          unit : "斤"
        },
        {
          id : "item002",
          name : "可乐",
          price : "4.00",
          unit : "瓶"
        },
        {
          id : "item003",
          name : "火腿肠",
          price : "2.00",
          unit : "根"
        }
      ]
    }
  );
  productInfo.save((err, data) => {
    console.log('success');
  });
}


function getProductInfo(callback) {
  productModel.find((err, data) => {
    callback(data);
  });
}

function callbackPrint(err, docs) {
  if(err) {
    console.log(err);
  }else{
    console.log(docs);
  }
}

function addNewItem(id) {
  let cart = new cartModel({id:id, count: 1});
  cart.save((err, docs) => {
    callbackPrint(err, docs);
  });
}

function updateCart(id, count) {
  if(arguments.length === 1) {

    cartModel.findOne({id : id}, (err, data) => {
      data.count++;
      data.save((err, data) => {
        callbackPrint(err, data);
      });
    });

  }else{
    cartModel.findOne({ id: id }, (err, data) => {
      data.count = count;
      data.save((err, docs) => {
        callbackPrint(err, docs);
      });
    });
  }
}


function getCart(callback) {
  cartModel.find((err, data) => {
    callback(data);
  });
}


function deleteCart(id) {
  cartModel.remove({id : id}, (err, data) => {
    callbackPrint(err, data);
  });
}

function cleanCart() {
  cartModel.remove({}, (err, data) => {
    callbackPrint(err, data);
  });
}

function getReceiptList(callback) {
  receiptListModel.find((err, receiptList) => {
    callback(receiptList);
  });
}

function getTimeStamp() {
  let myDate = new Date();
  let timeStamp = myDate.getTime();
  return timeStamp;
}


function addReceipt(cart, total) {
  let timeStamp = getTimeStamp();
  let receipt = new receiptListModel({total: total, timeStamp: timeStamp, cart: cart});
  receipt.save();
}

function deleteReceipt(timeStamp) {
  receiptListModel.remove({timeStamp : parseInt(timeStamp)});
}

exports.init  = init;
exports.getProductInfo = getProductInfo;
exports.addNewItem = addNewItem;
exports.getCart = getCart;
exports.updateCart = updateCart;
exports.deleteCart = deleteCart;
exports.cleanCart = cleanCart;
exports.getReceiptList = getReceiptList;
exports.addReceipt = addReceipt;
exports.deleteReceipt = deleteReceipt;

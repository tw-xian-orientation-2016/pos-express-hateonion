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
  }
);
let productModel = mongoose.model('Product', productSchema);

let cartSchema = new mongoose.Schema
(
  {
    count : String,
    id : String
  }
);
let cartModel = mongoose.model('Cart', cartSchema);

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
    console.log(data);
  });
  console.log('finish');
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



function addItem(id) {
  let cart = new cartModel({id:id, count: 1});
  cart.save((err, docs) => {
    callbackPrint(err, docs);
  });
}

function getCart(callback) {
  cartModel.find((err, data) => {
    callback(data);
  });
}

function updateCart(id, count) {
  cartModel.findOne({ id: id }, (err, data) => {
    data.count = count;
    data.save((err, docs) => {
      callbackPrint(err, docs);
    });
  });
}

function deleteCart(id) {
  cartModel.remove({id : id}, (err, data) => {
    callbackPrint(err, data);
  });
}

exports.init  = init;
exports.getProductInfo = getProductInfo;
exports.addItem = addItem;
exports.getCart = getCart;
exports.updateCart = updateCart;
exports.deleteCart = deleteCart;

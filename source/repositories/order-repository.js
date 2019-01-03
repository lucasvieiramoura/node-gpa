'use strict'

const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const ValidationContrant = require('../validators/fluent-validator');

exports.get = async(data) => {
    var res = await Order.find({},'number status items')
        .populate('customer', 'name')
        .populate('items.product','title');
    return res;
};

exports.create = async(data) => {
    var order = new Order(data)
    await order.save();
};
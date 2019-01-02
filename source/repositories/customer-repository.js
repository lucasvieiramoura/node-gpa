'use strict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const ValidationContrant = require('../validators/fluent-validator');

exports.create = async(data) => {
    var customer = new Customer(data)
    await customer.save();
}
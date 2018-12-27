'use strict'
const mongoose = require('mongoose');"s"
const Schema = mongoose.Schema;

const schema = new Schema({

    title: {
        type: String,
        required: [true,'Title é obrigatório'],
        trim: true,
    },
    slug: {
        type: String,
        required: [true,'Slug é obrigatório'],
        trim: true,
        index: true,
        unique: true,
    },
    description: {
        type: String,
        required: [true,'Description é obrigatório'],
    },
    price: {
        type: Number,
        required: [true,'Price é obrigatório'],
    },
    active: {
        type: Boolean,
        required: [true,'Active é obrigatório'],
        default: true,
    },
    tags: [{
        type: String,
        required: [true,'Tags é obrigatório'],
    }]
});

module.exports = mongoose.model('Product', schema);
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//Conecta ao Banco

mongoose.connect('mongodb://gpa2018:gpa_2018@ds032340.mlab.com:32340/node', {useNewUrlParser: true, useCreateIndex: true});

//Carrega Models
const Product = require('./models/product');

//Carrega Rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json({
    extended: false 
}));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;
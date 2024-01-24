'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://lucaoxt:KTVcGXNFWTlYhEc0@cluster1.socdj3b.mongodb.net/node-str?retryWrites=true&w=majority');

// Carrega os Models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

const index = require('./routes/index');
const product = require('./routes/product');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/products', product);

module.exports = app;

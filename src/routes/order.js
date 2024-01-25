'use strict'

const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/orders-controller');

router.get('/', OrdersController.index);

router.post('/', OrdersController.create);

//router.put('/:id', OrdersController.update);

//router.delete('/:id', OrdersController.delete);

module.exports = router;
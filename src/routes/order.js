'use strict'

const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/orders-controller');
const AuthService = require('../services/auth-service');

router.get('/', AuthService.authorize, OrdersController.index);

router.post('/', AuthService.authorize, OrdersController.create);

//router.put('/:id', OrdersController.update);

//router.delete('/:id', OrdersController.delete);

module.exports = router;
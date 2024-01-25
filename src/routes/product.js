'use strict'

const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/products-controller');
const AuthService = require('../services/auth-service');

router.get('/', ProductsController.index);

router.post('/', AuthService.isAdmin, ProductsController.create);

router.put('/:id', AuthService.isAdmin, ProductsController.update);

router.delete('/:id', AuthService.isAdmin, ProductsController.delete);

module.exports = router;
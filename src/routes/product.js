'use strict'

const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/products-controller');

router.get('/', ProductsController.index);

router.post('/', ProductsController.create);

router.put('/:id', ProductsController.update);

router.delete('/:id', ProductsController.delete);

module.exports = router;
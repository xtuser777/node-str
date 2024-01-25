'use strict'

const express = require('express');
const router = express.Router();
const CustomersController = require('../controllers/customers-controller');

//router.get('/', CustomersController.index);

router.post('/', CustomersController.create);

//router.put('/:id', CustomersController.update);

//router.delete('/:id', CustomersController.delete);

module.exports = router;
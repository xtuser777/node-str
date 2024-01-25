'use strict';

const guid = require('guid');
const OrderRepository = require('../repositories/order-repository');

class OrdersController {
  static async index(req, res, next) {
    try {
      res.status(200).send(await new OrderRepository().find());
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  static async create(req, res, next) {
    let data = req.body;
    data.number = guid.raw().substring(0, 6);
    try {
      res.status(201).send(await new OrderRepository().save(data));
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
}

module.exports = OrdersController;

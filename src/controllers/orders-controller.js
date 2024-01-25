'use strict';

const guid = require('guid');
const OrderRepository = require('../repositories/order-repository');
const AuthService = require('../services/auth-service');

class OrdersController {
  static async index(req, res, next) {
    try {
      res.status(200).send(await new OrderRepository().find());
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  static async create(req, res, next) {
    try {
      const token = req.body.token || req.query.token || req.headers['x-access-token'];
      const data = await AuthService.decodeToken(token);

      res.status(201).send(await new OrderRepository().save({ 
        ...req.body, 
        number: guid.raw().substring(0, 6), 
        customer: data.id 
      }));
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
}

module.exports = OrdersController;

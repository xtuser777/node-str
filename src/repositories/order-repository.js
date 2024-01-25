'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

class OrderRepository {
  async find() {
    return await Order.find({}, 'number, status, customer, items').populate('customer', 'name').populate('items.product', 'title');
  }

  async save(data) {
    return await new Order(data).save();
  }
}

module.exports = OrderRepository;
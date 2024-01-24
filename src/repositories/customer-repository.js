'use strict';
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.create = async(data) => {
    var customer = new Customer(data);
    await customer.save();
}

exports.authenticate = async(data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.getById = async(id) => {
    const res = await Customer.findById(id);
    return res;
}

class CustomerRepository {
  async create(data) {
    var customer = new Customer(data);
    await customer.save();
  }

  async authenticate(data) {
    const res = await Customer.findOne({
      email: data.email,
      password: data.password
    });
    return res;
  }

  async findOne(id) {
    const res = await Customer.findById(id);
    return res;
  }
}

module.exports = CustomerRepository;

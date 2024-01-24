'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

class ProductRepository {
  async find(filters) {
    return await Product.find({ ...filters, active: true }, 'title slug price');
  }

  async findOne(filters) {
    return await Product.findOne({ ...filters, active: true }, 'title slug price');
  }

  async create(data) {
    const entity = new Product(data);
    return await entity.save();
  }

  async update(id, data) {
    return await Product
      .findByIdAndUpdate(
        id,
        {
          $set: {
            title: data.title,
            description: data.description,
            price: data.price,
          },
        },
      );
  }

  async delete(id) {
    return await Product
      .findByIdAndDelete(id);
  }
}

module.exports = ProductRepository;
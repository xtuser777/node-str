'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');

class ProductsController {
  static index(req, res, next) {
    if (req.query._id || req.query.slug) return ProductsController.show(req, res, next);
    Product
      .find({ active: true }, 'title slug price')
      .then(data => res.status(200).send(data))
      .catch(e => res.status(400).send({ message: 'Erro', data: e }));
  }

  static show(req, res, next) {
    Product
      .findOne(req.query, 'title, description slug price tags')
      .then(data => res.status(200).send(data))
      .catch(e => res.status(400).send({ message: 'Erro', data: e }));
  }

  static create(req, res, next) {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres.');

    if (!contract.isValid()) {
      res.status(400).send(contract.errors()).end();
      return;
    }

    const product = new Product(req.body);
    product
      .save()
      .then(x => res.status(201).send(req.body))
      .catch(e => res.status(400).send({ message: 'Erro', data: e }));
  }

  static update(req, res, next) {
    const id = req.params.id;
    Product
      .findByIdAndUpdate(
        id,
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
          },
        },
      )
      .then(x => res.status(200).send({ message: 'Produto atualizado com sucesso!', data: x }))
      .catch(e => res.status(400).send({ message: 'Erro', data: e }));
  }

  static delete(req, res, next) {
    const id = req.params.id;
    Product
      .findByIdAndDelete(id)
      .then(x => res.status(204).send({ message: 'Produto removido com sucesso!', }))
      .catch(e => res.status(400).send({ message: 'Erro', data: e }));
  }
}

module.exports = ProductsController;
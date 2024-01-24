'use strict';

const ValidationContract = require('../validators/fluent-validator');
const ProductRepository = require('../repositories/product-repository');

class ProductsController {
  static async index(req, res, next) {
    if (req.query._id || req.query.slug) return ProductsController.show(req, res, next);
    const repository = new ProductRepository();
  
    try {
      const products = await repository.find(req.query);
      res.status(200).send(products);
    } catch (e) {
      res.status(400).send({ message: 'Erro', data: e });
    }
  }

  static async show(req, res, next) {
    const repository = new ProductRepository();

    try {
      const product = await repository.findOne(req.query);
      res.status(200).send(product);
    } catch (e) {
      res.status(400).send({ message: 'Erro', data: e });
    }
  }

  static async create(req, res, next) {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres.');

    if (!contract.isValid()) {
      res.status(400).send(contract.errors()).end();
      return;
    }

    const repository = new ProductRepository();
    try {
      const product = await repository.create(req.body);
      res.status(201).send(product);
    } catch (e) {
      res.status(400).send({ message: 'Erro', data: e });
    }
  }

  static async update(req, res, next) {
    const id = req.params.id;
    const repository = new ProductRepository();
    
    try {
      const product = await repository.update(id, req.body);
      res.status(200).send(product);
    } catch (e) {
      res.status(400).send({ message: 'Erro', data: e });
    }
  }

  static async delete(req, res, next) {
    const id = req.params.id;
    const repository = new ProductRepository();
    
    try {
      const product = await repository.delete(id);
      res.status(204).send(product);
    } catch (e) {
      res.status(400).send({ message: 'Erro', data: e });
    }
  }
}

module.exports = ProductsController;
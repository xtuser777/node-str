'use strict';

const md5 = require('md5');
const ValidationContract = require('../validators/fluent-validator');
const CustomerRepository = require('../repositories/customer-repository');
const EmailService = require('../services/email-service');

class CustomersController {
  static async create(req, res, next) {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres.');
    contract.isEmail(req.body.email, 'E-mail inválido.');
    contract.hasMinLen(req.body.password, 3, 'A senha deve conter pelo menos 3 caracteres.');

    if (!contract.isValid()) {
      res.status(400).send(contract.errors()).end();
      return;
    }

    const repository = new CustomerRepository();
    try {
      const product = await repository.create({ ...req.body, password: md5(req.body.password + global.SALT_KEY) });
      const emailService = new EmailService();
      // emailService.send(
      //   req.body.email,
      //   'Bem vindo ao Node Store',
      //   global.EMAIL_TMPL.replace('{0}', req.body.name)
      // );
      res.status(201).send(product);
    } catch (e) {
      res.status(400).send({ message: 'Erro', data: e });
    }
  }
}

module.exports = CustomersController;

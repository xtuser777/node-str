'use strict';

const md5 = require('md5');
const ValidationContract = require('../validators/fluent-validator');
const CustomerRepository = require('../repositories/customer-repository');
const EmailService = require('../services/email-service');
const AuthService = require('../services/auth-service');

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
      const product = await repository.create({ ...req.body, password: md5(req.body.password + global.SALT_KEY), roles: ['user'] });
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

  static async authenticate(req, res, next) {
    const repository = new CustomerRepository();
    try {
      const customer = await repository.authenticate({
        email: req.body.email,
        password: md5(req.body.password + global.SALT_KEY)
      });

      if (!customer) {
        res.status(404).send({
          message: 'Usuário ou senha inválidos'
        });
        return;
      }

      const token = await AuthService.generateToken({
        id: customer._id,
        email: customer.email,
        name: customer.name,
        roles: customer.roles,
      });

      res.status(201).send({
        token: token,
        data: {
          email: customer.email,
          name: customer.name
        }
      });
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      });
    }
  }

  static async refresh(req, res, next) {
    try {
      const token = req.body.token || req.query.token || req.headers['x-access-token'];
      const data = await AuthService.decodeToken(token);

      const repository = new CustomerRepository();
      const customer = await repository.getById(data.id);

      if (!customer) {
        res.status(404).send({
          message: 'Cliente não encontrado'
        });
        return;
      }

      const tokenData = await AuthService.generateToken({
        id: customer._id,
        email: customer.email,
        name: customer.name,
        roles: customer.roles
      });

      res.status(201).send({
        token: token,
        data: {
          email: customer.email,
          name: customer.name
        }
      });
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      });
    }
  }
}

module.exports = CustomersController;

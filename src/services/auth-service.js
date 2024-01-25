'use strict';

const jwt = require('jsonwebtoken');

class AuthService {
    static async generateToken(data) {
        return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
    }

    static async decodeToken(token) {
        var data = await jwt.verify(token, global.SALT_KEY);
        return data;
    }

    static async authorize(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (!token) {
            res.status(401).json({
                message: 'Acesso Restrito'
            });
        } else {
            jwt.verify(token, global.SALT_KEY, function (error, decoded) {
                if (error) {
                    res.status(401).json({
                        message: 'Token Inválido'
                    });
                } else {
                    next();
                }
            });
        }
    }

    static async isAdmin(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (!token) {
            res.status(401).json({
                message: 'Token Inválido'
            });
        } else {
            jwt.verify(token, global.SALT_KEY, function (error, decoded) {
                if (error) {
                    res.status(401).json({
                        message: 'Token Inválido'
                    });
                } else {
                    if (decoded.roles.includes('admin')) {
                        next();
                    } else {
                        res.status(403).json({
                            message: 'Esta funcionalidade é restrita para administradores'
                        });
                    }
                }
            });
        }
    }
}

module.exports = AuthService;

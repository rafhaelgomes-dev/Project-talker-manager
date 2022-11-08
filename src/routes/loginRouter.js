const express = require('express');

const loginRouter = express.Router();
const cryptoToken = require('crypto');
const validateEmailSenha = require('../middlewares/validateLogin');

const generateCrypto = cryptoToken.randomBytes(8).toString('hex');

loginRouter.post('/', validateEmailSenha, (_req, res) => {
  res.status(200).json({ token: generateCrypto });
});

module.exports = loginRouter;
const express = require('express');

const loginRouter = express.Router();
const cryptoToken = require('crypto');
const validateEmailSenha = require('../middlewares/validateLogin');

loginRouter.post('/', validateEmailSenha, (_req, res) => {
  const generateCrypto = cryptoToken.randomBytes(8).toString('hex');
  res.status(200).json({ token: generateCrypto });
});

module.exports = loginRouter;
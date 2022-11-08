const validateId = (req, res, next) => {
  const { id } = req.params;
  const idAsNumber = Number(id);
  if (Number.isNaN(idAsNumber)) {
    return res.status(400).send({ message: 'Id inválido' });
  }
    next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }

  if (authorization.length < 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  next();
};

const validateCampos = (req, res, next) => {
  const { name, age } = req.body;
  if (!name) {
    return res.status(400).send({ message: 'O campo \'name\' é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(401).send({ message: 'O \'name\' deve ter pelo menos 3 caracteres' });
  }

  if (!age) {
    return res.status(401).send({ message: 'O campo \'age\' é obrigatório' });
  }

  if (Number(age) < 18) {
    return res.status(401).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

module.exports = {
  validateId,
  validateToken,
  validateCampos,
};

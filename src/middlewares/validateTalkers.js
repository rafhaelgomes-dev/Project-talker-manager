const validateData = (data) => {
  const dataValidate = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  if (dataValidate.test(data)) {
    return true; 
  }
    return false;
};

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
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (!age) {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }

  if (Number(age) < 18) {
    return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateCamposTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).send({ message: 'O campo "talk" é obrigatório' });
  }

  if (!talk.watchedAt) {
    return res.status(400).send({ message: 'O campo "watchedAt" é obrigatório' });
  }
  const validarData = validateData(talk.watchedAt);
  if (!validarData) {
    return res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateCamposRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  if (!rate) {
    return res.status(400).send({ message: 'O campo "rate" é obrigatório' });
  }

  if (!Number.isInteger(rate) || Number(rate) > 5 || Number(rate) < 1) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const validateCamposRatePut = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (!Number.isInteger(rate) || Number(rate) > 5 || Number(rate) < 1) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const validateCamposRatePut3 = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (Number(rate) < 1) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const validateCamposRatePut2 = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  if (!rate) {
    return res.status(400).send({ message: 'O campo "rate" é obrigatório' });
  }

  next();
};

module.exports = {
  validateId,
  validateToken,
  validateCampos,
  validateCamposRate,
  validateCamposTalk,
  validateCamposRatePut,
  validateCamposRatePut2,
  validateCamposRatePut3,
};

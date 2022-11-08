const validateId = (req, res, next) => {
  const { id } = req.params;
  const idAsNumber = Number(id);
  if (Number.isNaN(idAsNumber)) {
    res.status(400).send({ message: 'Id inválido' });
  } else {
    next();
  }
};

module.exports = {
  validateId,
};

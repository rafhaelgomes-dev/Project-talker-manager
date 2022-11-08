const express = require('express');

const fsUtils = require('../utils/fsUtils');
const {
  validateId,
  validateToken, 
  validateCamposTalk,
  validateCamposRate, 
  validateCampos,
} = require('../middlewares/validateTalkers');

const talkerRouter = express.Router();

talkerRouter.get('/', async (_req, res) => {
  const talker = await fsUtils.returnAllToSpeakers();
  if (talker.length === 0) {
    return res.status(200).send([]);
  }
  res.status(200).json(talker);
});

talkerRouter.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const talker = await fsUtils.returnsSpeakerId(id);
  if (talker.length === 0) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talker[0]);
});

talkerRouter.post('/',
validateToken,
validateCamposTalk,
validateCamposRate,
validateCampos,
async (req, res) => {
  const { name, age, talk } = req.body;
  const talkerRead = await fsUtils.returnAllToSpeakers();
  const idTalker = talkerRead[talkerRead.length - 1].id;
  const data = {
    id: Number(idTalker) + 1,
    name,
    age,
    talk,
  };
  const add = [...talkerRead, data];
  await fsUtils.writingData(add);
  res.status(201).json(data);
});

module.exports = talkerRouter;
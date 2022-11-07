const express = require('express');
const fsUtils = require('../utils/fsUtils');
const { validateId } = require('../middlewares/validateTalkers');

const router = express.Router();

router.get('/', async (req, res) => {
  const talker = await fsUtils.returnAllToSpeakers();
  if (talker.length === 0) {
    return res.status(200).send([]);
  }
  res.status(200).json(talker);
});

router.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const talker = await fsUtils.returnsSpeakerId(id);
  if (talker.length === 0) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talker[0]);
});

module.exports = router;
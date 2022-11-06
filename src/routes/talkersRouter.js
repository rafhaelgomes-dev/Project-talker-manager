const express = require('express');
const fsUtils = require('../utils/fsUtils');

const router = express.Router();

router.get('/',  async (req, res) => {
  const talker = await fsUtils.returnAllToSpeakers();
  if (talker.length === 0) {
    res.status(200).send([]);
  }
  res.status(200).json(talker);
})


module.exports = router;
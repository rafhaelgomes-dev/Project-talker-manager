const fs = require('fs').promises;
const path = require('path');

const returnAllToSpeakers = async () => {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
    const talkers = JSON.parse(data);
    return talkers;
  } catch (error) {
    return error;
  }
};

module.exports = {returnAllToSpeakers};
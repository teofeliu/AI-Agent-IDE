// backend/src/utils/fileUtils.js

const fs = require('fs').promises;
const path = require('path');

exports.readJSONFile = async (filename) => {
  const filePath = path.join(__dirname, '..', 'data', filename);
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};
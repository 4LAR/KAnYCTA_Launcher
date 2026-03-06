const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function downloadFile(url, destination, options={}) {
  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream',
  }, options);

  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(destination);
    response.data.pipe(writer);
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

module.exports = downloadFile;

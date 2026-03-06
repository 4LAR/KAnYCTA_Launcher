const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const downloadFile = require('./downloadFile');

async function checkFileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

async function downloadForge(minecraftVersion, destination="./forge.jar", options={}) {
  try {
    const response = await axios.get(`https://files.minecraftforge.net/net/minecraftforge/forge/index_${minecraftVersion}.html`, options);
    const html = response.data;
    const $ = cheerio.load(html);

    const url_ads = $($('.link.link-boosted')[0]).find("a").attr('href').split("/");
    const last_version = url_ads[url_ads.length - 2]
    console.log(`Last stable forge version for ${minecraftVersion}: ${last_version}`);
    console.log(`Start download forge-${last_version}-installer.jar`);

    if (await checkFileExists(destination)) {
      console.log('Forge already exist.');
    } else {
      await downloadFile(`https://maven.minecraftforge.net/net/minecraftforge/forge/${last_version}/forge-${last_version}-installer.jar`, destination, options)
      console.log('File downloaded successfully!');
    }

  } catch (error) {
    console.error('Ошибка при получении:', error);
  }
}

exports.downloadForge = downloadForge;

// example
// (async () => {
//   const minecraftVersion = '1.20.1';
//   const forgeVersion = await downloadForge(minecraftVersion, ".");
// })();

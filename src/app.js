const path = require('path');
const fs = require('fs/promises');
const { Client, Authenticator } = require('minecraft-launcher-core');
const { VERSION, NICKNAME, RAM_MIN, RAM_MAX } = require('./config/loadConfig');
// const { downloadForge } = require('./downloadable/forge');
const parseVersion = require('./utils/versionParser');

const root = "./minecraft"

const launcher = new Client();

module.exports = async () => {
  const version_dict = await parseVersion(VERSION);

  let opts = {
    authorization: Authenticator.getAuth(NICKNAME),
    root: path.join(root),
    version: {
      number: version_dict.version,
      type: version_dict.type
    },
    memory: {
      max: RAM_MAX,
      min: RAM_MIN
    }
  }

  try {
    await fs.mkdir(root, { recursive: true });
    // opts.forge = path.join(root, "forge.jar")
    if (version_dict.forge) {
      opts.forge = path.join(root, "forge.jar")
      // , {
      //   proxy: {
      //     protocol: 'http',
      //     host: PROXY_ADDR,
      //     port: PROXY_PORT
      //   }
      // }
      // await downloadForge(version_dict.version, path.join(root, "forge.jar"));
    }

    console.log("Run game");
    launcher.launch(opts);

    launcher.on('debug', (e) => console.log(e));
    launcher.on('data', (e) => console.log(e));
    launcher.on('error', (e) => console.log(e));

  } catch (error) {
    console.error('Error:', error);
  }
}

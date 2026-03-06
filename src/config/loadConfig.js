const fs = require("fs");
const ini = require("ini");
const DEFAULT = require("./config.default");

const PATH = "./config.ini";

// если файла нет — создаём с дефолтами
if (!fs.existsSync(PATH)) {
  fs.writeFileSync(PATH, ini.stringify(DEFAULT));
}

// читаем существующий файл
let raw = fs.readFileSync(PATH, "utf8");
let config = ini.parse(raw);

// флаг — были ли изменения
let changed = false;

// проверяем каждый параметр
for (const key in DEFAULT) {
  if (!(key in config)) {
    config[key] = DEFAULT[key];
    changed = true;
  }
}

// если чего-то не хватало — перезаписываем файл
if (changed) {
  fs.writeFileSync(PATH, ini.stringify(config));
}

module.exports = config;

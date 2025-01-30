// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//                    _ooOoo_
//                   o8888888o
//                   88" . "88
//                   (| -_- |)
//                   O\  =  /O
//                ____/`---'\____
//              .'  \\|     |//  `.
//             /  \\|||  :  |||//  \
//            /  _||||| -:- |||||-  \
//            |   | \\\  -  /// |   |
//            | \_|  ''\---/''  |   |
//            \  .-\__  `-`  ___/-. /
//          ___`. .'  /--.--\  `. . __
//       ."" '<  `.___\_<|>_/___.'  >'"".
//      | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//      \  \ `-.   \_ __\ /__ _/   .-` /  /
// ======`-.____`-.___\_____/___.-`____.-'======
//                    `=---='
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//        PHẬT ĐỘ   KHÔNG LỖI   KHÔNG BUG
//                HA MANH HUNG
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const moment = require("moment-timezone");
const { readdirSync, readFileSync, writeFileSync, existsSync, unlinkSync, readJSONSync } = require("fs-extra");
const { join, resolve, extname, relative } = require("path");
const logger = require("./main/utils/log.js");
const login = require("fca-delta");
const fs = require('fs');
const semver = require("semver")
const chalk = require("chalkercli");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

global.delta = {
  timeStart: Date.now() - process.uptime() * 1000,
  commands: new Map(),
  events: new Map(),
  cd: new Map(),
  eventRegistered: [],
  oneSchedule: [],
  onReaction: [],
  onReply: [],
  mainPath: process.cwd(),
  configPath: join(process.cwd(), '/main/json/config.json'),
  getTime: (option) => moment.tz("Asia/Ho_Chi_Minh").format({
    seconds: "ss",
    minutes: "mm",
    hours: "HH",
    date: "DD",
    month: "MM",
    year: "YYYY",
    fullHour: "HH:mm:ss",
    fullYear: "DD/MM/YYYY",
    fullTime: "HH:mm:ss DD/MM/YYYY"
  }[option]),
};
global.data = new Object({
  threadInfo: new Map(),
  threadData: new Map(),
  userName: new Map(),
  userBanned: new Map(),
  threadBanned: new Map(),
  commandBanned: new Map(),
  threadAllowNSFW: new Array(),
  allUserID: new Array(),
  allCurrenciesID: new Array(),
  allThreadID: new Array()
});
global.config = JSON.parse(readFileSync(global.delta.configPath, 'utf8'));
global.configModule = {};
global.moduleData = [];
global.utils = require("./main/utils");
global.api = require("./system/api");
global.tools = require("./system/tools.js");
global.account = {
  email: global.config.EMAIL,
  pass: global.config.PASSWORD,
  otpkey: global.config.OTPKEY,
  fbsate: fs.existsSync('./system/data/fbstate.json') ? JSON.parse(fs.readFileSync('./system/data/fbstate.json', 'utf8') || '[]') : (fs.writeFileSync('./system/data/fbstate.json', '[]'), JSON.parse('[]')),
  cookie: JSON.parse(readFileSync('./system/data/fbstate.json')).map(i => `${i.key}=${i.value}`).join(";"),
  token: {
    EAAD6V7: "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662"
  }
};
global.anti = resolve(process.cwd(), 'system', 'data', 'antisetting.json');
function parseCookies(cookies) {
  const trimmed = cookies.includes('useragent=') ? cookies.split('useragent=')[0] : cookies;
  return trimmed.split(';').map(pair => {
    let [key, value] = pair.trim().split('=');
    if (value !== undefined) {
      return {
        key,
        value,
        domain: "facebook.com",
        path: "/",
        hostOnly: false,
        creation: new Date().toISOString(),
        lastAccessed: new Date().toISOString()
      };
    }
  }).filter(item => item !== undefined);
}
const data = fs.readFileSync('./account.txt', 'utf8');
var appState = parseCookies(data);
function relogin() {
  rl.question("[ RELOGIN ] > Cookie die? Nhập cookie mới tại đây: ", (newCookie) => {
    if (newCookie) {
      fs.writeFileSync('./account.txt', newCookie);
      logger("Đã lưu cookie mới!", "[ SYSTEM ]");
      process.exit(1);
    }
  });
}
async function onBot({ models }) {
  login({ appState: appState }, async (loginError, api) => {
    if (loginError) {
      logger("Đăng nhập thất bại!", 'error');
      return relogin();
    }
    api.setOptions(global.config.FCAOption);
    writeFileSync('./system/data/fbstate.json', JSON.stringify(api.getAppState(), null, 2));
    global.delta.api = api;
    global.config.version = '1.1.0';

    const axios = require('axios');

    async function stream_url(url) {
      const response = await axios({
        url: url,
        responseType: 'stream',
      });
      return response.data;
    }

    async function upload(url) {
      const uploadData = await stream_url(url);
      const response = await api.postFormData('https://upload.facebook.com/ajax/mercury/upload.php', {
        upload_1024: uploadData
      });
      const parsedResponse = JSON.parse(response.body.replace('for (;;);', ''));
      return Object.entries(parsedResponse.payload?.metadata?.[0] || {})[0];
    }

    let status = false;
    let queues = []

    setInterval(async () => {
      if (status) return;
      status = true;

      if (queues.length < 20) {
        const itemsNeeded = Math.min(20 - queues.length, 5);
        const uploadPromises = [...Array(itemsNeeded)].map(() => {
          const randomIndex = Math.floor(Math.random() * global.api.vdgai.length);
          return upload(global.api.vdgai[randomIndex]);
        });

        const res = await Promise.all(uploadPromises);
        const validResults = res.filter(result => result !== null);
        console.log(validResults);
        queues.push(...validResults);
      }

      status = false;
    }, 1000 * 5);

    global.delta.queues = queues;


    (function () {
      const loadModules = (path, collection, disabledList, type) => {
        const items = readdirSync(path).filter(file => file.endsWith('.js' || '.mjs') && !file.includes('example') && !disabledList.includes(file));
        let loadedCount = 0;
        for (const file of items) {
          try {
            const item = require(join(path, file));
            const { config, onCall, onLoad, onEvent } = item;

            if (!config || !onCall || (type === 'commands' && !config.Category)) {
              throw new Error(`Lỗi định dạng trong ${type === 'commands' ? 'lệnh' : 'sự kiện'}: ${file}`);
            }
            if (global.delta[collection].has(config.name)) {
              throw new Error(`Tên ${type === 'commands' ? 'lệnh' : 'sự kiện'} đã tồn tại: ${config.name}`);
            }
            if (config.envConfig) {
              global.configModule[config.name] = global.configModule[config.name] || {};
              global.config[config.name] = global.config[config.name] || {};
              for (const key in config.envConfig) {
                global.configModule[config.name][key] = global.config[config.name][key] || config.envConfig[key] || '';
                global.config[config.name][key] = global.configModule[config.name][key];
              }
            }
            if (onLoad) onLoad({ api, models });
            if (onEvent) global.delta.eventRegistered.push(config.name);
            global.delta[collection].set(config.name, item);
            loadedCount++;
          } catch (error) {
            console.error(`Lỗi khi tải ${type === 'commands' ? 'lệnh' : 'sự kiện'} ${file}:`, error);
          }
        }
        return loadedCount;
      };
      const commandPath = join(global.delta.mainPath, 'scripts', 'cmds');
      const eventPath = join(global.delta.mainPath, 'scripts', 'events');
      const loadedCommandsCount = loadModules(commandPath, 'commands', global.config.commandDisabled, 'commands');
      const loadedEventsCount = loadModules(eventPath, 'events', global.config.eventDisabled, 'events');
      logger.loader(`Loaded ${loadedCommandsCount} cmds - ${loadedEventsCount} events`);
    })();
    writeFileSync(global.delta.configPath, JSON.stringify(global.config, null, 4), 'utf8');
    const listener = require('./system/listen')({ api, models })
    logger("Auto check data rent đã hoạt động!", "[ RENT ]");
    setInterval(async () => await require("./main/checkRent.js")(api), 1000 * 60 * 30);
    async function refreshFb_dtsg() {
      try {
        await api.refreshFb_dtsg();
        logger("Đã làm mới fb_dtsg và jazoest thành công");
      } catch (err) {
        logger("error", "Đã xảy ra lỗi khi làm mới fb_dtsg và jazoest", err);
      }
    }
    setInterval(refreshFb_dtsg, 1000 * 60 * 60 * 48);
    function listenerCallback(error, event) {
      if (error) {
        logger("Lỗi khi lắng nghe sự kiện.", 'error')
      }
      if (["presence", "typ", "read_receipt"].some((data) => data === event?.type)) return;
      if (global.config.DeveloperMode) console.log(event);
      return listener(event);
    }
    function connect_mqtt() {
      global.mqttClient = api.listenMqtt(listenerCallback);
      setTimeout(() => (global.mqttClient.end(), connect_mqtt()), 1000 * 60 * 60 * 5);
    }
    connect_mqtt();
  })
}

function autoCleanCache() {
  const cachePath = "./scripts/cmds/cache";
  const allowedExtensions = [".png", ".jpg", ".jpeg", ".mp4", ".mp3", ".m4a", ".ttf", ".gif", ".mov"];
  fs.readdir(cachePath, (err, files) => {
    if (err) {
      console.error('Lỗi khi đọc thư mục:', err);
      return;
    }
    files.forEach((file) => {
      const filePath = join(cachePath, file);
      if (allowedExtensions.includes(extname(file).toLowerCase())) {
        fs.unlink(filePath, (err) => {
          if (err) {
            logger('Không Thể Dọn Dẹp Cache', "[ SYSTEM ]");
          }
        });
      }
    });
    logger('Đã Dọn Dẹp Cache', "[ SYSTEM ]");
  });
}
autoCleanCache();

const rainbow = chalk.rainbow("██████╗░███████╗██╗░░░░░████████╗░█████╗░\n██╔══██╗██╔════╝██║░░░░░╚══██╔══╝██╔══██╗\n██║░░██║█████╗░░██║░░░░░░░░██║░░░███████║\n██║░░██║██╔══╝░░██║░░░░░░░░██║░░░██╔══██║\n██████╔╝███████╗███████╗░░░██║░░░██║░░██║\n╚═════╝░╚══════╝╚══════╝░░░╚═╝░░░╚═╝░░╚═╝\m").stop();
rainbow.render();
const frame = rainbow.frame();
console.log(frame);
(async () => {
  const { Sequelize, sequelize } = require("./main/db/data");
  try {
    await sequelize.authenticate();
    const authentication = {};
    authentication.Sequelize = Sequelize;
    authentication.sequelize = sequelize;
    const models = require('./main/db/data/model')(authentication);
    const botData = {};
    botData.models = models;
    logger("Kết nối đến cơ sở dữ liệu thành công", "[ DATABASE ]");
    const nodeVersion = semver.parse(process.version);
    logger(`Bạn đang sử dụng NodeJS v${nodeVersion}`, '[ SYSTEM ]');
    await onBot(botData);
  } catch (error) {
    logger('Không thể kết nối đến cơ sở dữ liệu: ' + JSON.stringify(error), '[ DATABASE ]');
  }
})();
process.on('unhandledRejection', (err, p) => { }).on('uncaughtException', err => {
  console.log(err);
});
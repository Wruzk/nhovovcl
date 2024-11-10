module.exports = function ({ api, models, Users, Threads, Currencies }) {
  const fs = require("fs");
  const stringSimilarity = require('string-similarity');
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const logger = require(process.cwd() + "/main/utils/log.js");
  const axios = require('axios');
  const request = require('request');
  const path = require('path');
  const moment = require("moment-timezone");
  return async function ({ event }) {
    const msg = await global.utils.msg(api, event);
    const dateNow = Date.now();
    const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss DD/MM/YYYY");
    const { allowInbox, PREFIX, ADMINBOT, NDH, DeveloperMode, adminOnly } = global.config;
    const { userBanned, threadBanned, threadInfo, threadData, commandBanned } = global.data;
    const { commands, cd } = global.Furina;
    var { body, senderID, threadID, messageID } = event;
    var senderID = String(senderID);
    var threadID = String(threadID);
    const ten = await Users.getNameUser(event.senderID);
    // if (senderID === api.getCurrentUserID()) return;
    const threadSetting = threadData.get(threadID) || {};
    const prefixRegex = new RegExp(`^(<@!?${senderID}>|${escapeRegex((threadSetting.PREFIX || PREFIX))})\\s*`);
    const prefixbox = threadSetting.PREFIX || PREFIX;
    const adminbot = require(process.cwd() + '/main/json/config.json');
    const threadInf = threadInfo.get(threadID) || await Threads.getInfo(threadID);
    const findd = threadInf.adminIDs.find(el => el.id == senderID);
    const dataAdbox = require(process.cwd() + '/system/data/dataAdbox.json');
    if (typeof body === 'string' && body.startsWith(prefixbox) && !NDH.includes(senderID) && !ADMINBOT.includes(senderID) && adminbot.adminOnly == true) {
      return api.sendMessage('[ WARNING ] - Hiện tại đang bật chế độ AdminOnly chỉ ADMIN mới được sử dụng bot!!!', threadID, messageID);
    }
    if (typeof body === 'string' && body.startsWith(prefixbox) && dataAdbox.adminbox.hasOwnProperty(threadID) && dataAdbox.adminbox[threadID] == true && !NDH.includes(senderID) && !ADMINBOT.includes(senderID) && !findd && event.isGroup == true) {
      return api.sendMessage('[ WARNING ] - Hiện tại nhóm này đang bật chế độ chỉ quản trị viên nhóm mới có thể sử dụng bot!!!', event.threadID, event.messageID);
    }
    /*if (userBanned.has(senderID) || threadBanned.has(threadID) || !allowInbox && senderID == threadID) {
      if (!ADMINBOT.includes(senderID) && !NDH.includes(senderID)) {
        if (userBanned.has(senderID)) {
          const { reason, dateAdded } = userBanned.get(senderID);
          return api.sendMessage(`⩺ Bạn đã bị mất quyền công dân\n⩺ Lý do: ${reason}\n⩺ Vào lúc: ${dateAdded}\n⩺ Liên hệ Admin để được unban`, threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 15 * 1000));
            return api.unsendMessage(info.messageID);
          }, messageID);
        } else if (threadBanned.has(threadID)) {
          const { reason, dateAdded } = threadBanned.get(threadID);
          return api.sendMessage(`⩺ Nhóm đã bị mất quyền công dân\n⩺ Lý do: ${reason}\n⩺ Vào lúc: ${dateAdded}\n⩺ Liên hệ Admin để được unban`, threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 15 * 1000));
            return api.unsendMessage(info.messageID);
          }, messageID);
        }
      }
    }*/
   body = body !== undefined ? body : 'x';
    const [matchedPrefix] = body.match(prefixRegex) || [''];
    var args = body.slice(matchedPrefix.length).trim().split(/ +/);
    var commandName = args.shift().toLowerCase();
    var command = commands.get(commandName);
    if (!prefixRegex.test(body)) {
      args = (body || '').trim().split(/ +/);
      commandName = args.shift()?.toLowerCase();
      command = commands.get(commandName);
      if (command && command.config) {
        if (typeof body === 'string' && !body.startsWith(prefixbox) && command.config.hasPrefix === false && !NDH.includes(senderID) && !ADMINBOT.includes(senderID) && adminOnly == true) {
            return api.sendMessage('[ WARNING ] - Hiện tại đang bật chế độ AdminOnly chỉ ADMIN mới được sử dụng bot!!!', threadID, messageID);
        }
        if (typeof body === 'string' && !body.startsWith(prefixbox) && command.config.hasPrefix === false && dataAdbox.adminbox[threadID] && dataAdbox.adminbox.hasOwnProperty(threadID) && dataAdbox.adminbox[threadID] == true && !NDH.includes(senderID) && !ADMINBOT.includes(senderID) && !findd && event.isGroup == true) {
            return api.sendMessage('[ WARNING ] - Hiện tại nhóm này đang bật chế độ chỉ quản trị viên nhóm mới có thể sử dụng bot!!!', threadID, messageID);
        }
        if (command.config.hasPrefix === false && commandName.toLowerCase() !== command.config.name.toLowerCase()) {
          return;
        }
        if (command.config.hasPrefix === true && !body.startsWith(prefixbox)) {
          return;
        }
      }
      if (command && command.config) {
        if (typeof command.config.hasPrefix === 'undefined') {
          return;
        }
      }
    }
    if (!command) {
      if (!body.startsWith((threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : PREFIX)) return;
      for (const [name, cmd] of commands.entries()) {
        if (cmd.config.aliases && cmd.config.aliases.includes(commandName)) {
          command = cmd;
          break;
        }
      }
    }
    if (!command) {
      if (!body.startsWith((threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : PREFIX)) return;
      var allCommandName = [];
      const commandValues = commands.keys();
      for (const cmd of commandValues) allCommandName.push(cmd);
      const checker = stringSimilarity.findBestMatch(commandName, allCommandName);
      if (checker.bestMatch.rating >= 0.8) {
        command = commands.get(checker.bestMatch.target);
      } else {
        const thinh = require("./../data/thinh.json");
        const rand = thinh[Math.floor(Math.random() * thinh.length)]
        return api.sendMessage({body: `━━━━━━━━━━━━━━━\n💫 Sai lệnh 💫\n━━━━━━━━━━━━━━━\n\n<!> Lệnh bạn sử dụng có phải "${checker.bestMatch.target}"?\n📝 Gõ ${prefixbox}menu để xem các lệnh hiện có\n\n| Thính: ${rand}
`, attachment: global.Furina.queues.splice(0, 1)}, event.threadID, async (err, info) => {
          if (!err) {
            await new Promise(resolve => setTimeout(resolve, 30 * 1000));
            //api.unsendMessage(info.messageID)
          }
        }, event.messageID);
      }
    }
    if (command) {
      const path = process.cwd() + '/system/data/commands-banned.json';
      const disableCommandPath = process.cwd() + '/system/data/disable-command.json';
      const send = msg => api.sendMessage(msg, threadID, messageID);
      const isQtvBox = id => threadInfo.get(threadID).adminIDs.some(admin => admin.id == id);
      const getName = id => global.data.userName.get(id);
      const cmd = command.config.name;
      let data = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path)) : {};
      let disableData = fs.existsSync(disableCommandPath) ? JSON.parse(fs.readFileSync(disableCommandPath)) : {};
      if (data[threadID]) {
        const ban = data[threadID].cmds.find(b => b.cmd == cmd);
        const userBans = data[threadID].users[senderID] || {};
        const userBan = userBans.cmds?.find(b => b.cmd == cmd);
        const allBan = userBans.all;
        const banMsg = (banType, author, time) => `❎ ${time} ${banType}: ${getName(author)}\n📝 Đã cấm bạn sử dụng lệnh ${cmd}`;
        if (ban && (ADMINBOT.includes(ban.author) || isQtvBox(ban.author)) && !NDH.includes(senderID) && ban.author != senderID) {
          return send(banMsg(isQtvBox(ban.author) ? 'qtv nhóm' : 'admin bot', ban.author, ban.time));
        }
        if (allBan?.status && ((ADMINBOT.includes(allBan.author) && !ADMINBOT.includes(senderID)) || (isQtvBox(allBan.author) && !NDH.includes(senderID) && !isQtvBox(senderID) && !ADMINBOT.includes(senderID)))) {
          return send(`❎ ${allBan.time} ${isQtvBox(allBan.author) ? 'qtv box' : 'admin bot'}: ${getName(allBan.author)} cấm`);
        }
        if (userBan && ((ADMINBOT.includes(userBan.author) && !ADMINBOT.includes(senderID)) || (isQtvBox(userBan.author) && !isQtvBox(senderID) && !ADMINBOT.includes(senderID)))) {
          return send(banMsg(isQtvBox(userBan.author) ? 'qtv nhóm' : 'admin bot', userBan.author, userBan.time));
        }
      }
      if ((disableData[threadID]?.commands?.[command.config.name] || disableData[threadID]?.categories?.[command.config.Category]) && !NDH.includes(senderID) && !ADMINBOT.includes(senderID)) {
        if (disableData[threadID]?.categories?.[command.config.Category]) {
          return api.sendMessage(`❎ Nhóm lệnh '${command.config.Category}' đã bị cấm trong nhóm này`, threadID);
          }
        if (disableData[threadID]?.commands?.[command.config.name]) {
          return api.sendMessage(`❎ Lệnh '${command.config.name}' đã bị cấm trong nhóm này`, threadID);
          }
       }
    }
    if (commandBanned.get(threadID) || commandBanned.get(senderID)) {
      if (!ADMINBOT.includes(senderID) && !NDH.includes(senderID)) {
        const banThreads = commandBanned.get(threadID) || [],
          banUsers = commandBanned.get(senderID) || [];
        if (banThreads.includes(command.config.name))
          return api.sendMessage(`📌 Nhóm đã bị cấm sử dụng lệnh '${command.config.name}'`, threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 15 * 1000))
            return api.unsendMessage(info.messageID);
          }, messageID);
        if (banUsers.includes(command.config.name))
          return api.sendMessage(`📌 Bạn đã bị cấm sử dụng lệnh '${command.config.name}'`, threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 15 * 1000));
            return api.unsendMessage(info.messageID);
          }, messageID);
      }
    }
    if (event.isGroup) {
      try {
        threadInfo2 = threadInfo.get(threadID) || await Threads.getInfo(threadID);
        if (Object.keys(threadInfo2).length == 0) throw new Error("Không thể lấy thông tin về luồng dữ liệu.");
      } catch (err) {
        console.error("Lỗi: Không thể lấy thông tin về luồng dữ liệu:", err);
      }
    }
    if (command.config.Category.toLowerCase() == 'nsfw' && !global.data.threadAllowNSFW.includes(threadID) && !NDH.includes(senderID) && !ADMINBOT.includes(senderID)) {
      return api.sendMessage(`❎ Nhóm không được phép sử dụng các lệnh thuộc nhóm NSFW!`, threadID, async (err, info) => {
        await new Promise(resolve => setTimeout(resolve, 15 * 1000))
        return api.unsendMessage(info.messageID);
      }, messageID);
    }
    // var permssion = 0;
    //     const threadInfoo = (await Threads.getData(threadID)).threadInfo;
    //     const find = threadInfoo.adminIDs.find(el => el.id == senderID);
		//  if (NDH.includes(senderID.toString())) permssion = 3;
    //      else if (ADMINBOT.includes(senderID.toString())) permssion = 2;
    //      else if (find) permssion = 1;
		 var permssion = 0;
    const threadInfoo = threadInfo.get(threadID) || await Threads.getInfo(threadID);
    const find = threadInfoo.adminIDs.find(el => el.id == senderID);
    if (NDH.includes(senderID.toString())) permssion = 3;
    else if (ADMINBOT.includes(senderID.toString())) permssion = 2;
    else if (!ADMINBOT.includes(senderID) && !NDH.includes(senderID) && find) permssion = 1;
    const rolePermissions = {
      1: "Quản Trị Viên",
      2: "Admin Bot",
      3: "Dev Bot"
    };
    const requiredPermission = rolePermissions[command.config.role] || "";
    if (command.config.role > permssion) {
      api.setMessageReaction('⛔', messageID, () => {}, true);
      return api.sendMessage(`📌 Lệnh ${command.config.name} có quyền hạn là ${requiredPermission}`, threadID, async (err, info) => {
        await new Promise(resolve => setTimeout(resolve, 15 * 1000));
        return api.unsendMessage(info.messageID);
      }, messageID);
    }
    if (!cd.has(command.config.name)) cd.set(command.config.name, new Map());
    const timestamps = cd.get(command.config.name);
    const expirationTime = (command.config.cd || 1) * 1000;
    if (timestamps.has(senderID) && dateNow < timestamps.get(senderID) + expirationTime) {
      api.setMessageReaction('⏱️', messageID, () => {}, true);
      return api.sendMessage(`⏱️ Bạn sử dụng quá nhanh, vui lòng thử lại sau: ${((timestamps.get(senderID) + expirationTime - dateNow)/1000).toString().slice(0, 5)} giây`, threadID, async (err, info) => {
        await new Promise(resolve => setTimeout(resolve, 15 * 1000));
        return api.unsendMessage(info.messageID);
      }, messageID);
    }
    try {
      command.onCall({ api, event, args, models, msg, Users, Threads, Currencies, permssion });
      timestamps.set(senderID, dateNow);
      if (DeveloperMode) logger(`Lệnh ${commandName} được thực thi lúc ${time} bởi ${senderID} trong nhóm ${threadID}, thời gian thực thi: ${(Date.now()) - dateNow}ms`, "MODE");
    } catch (e) {
      return api.sendMessage(`❎ Lỗi khi thực thi lệnh ${commandName}: ${e}`, threadID);
    }
  };
};
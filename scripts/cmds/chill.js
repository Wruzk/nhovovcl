const axios = require("axios");
const request = require("request");
const fs = require("fs");
const moment = require("moment-timezone");
const link = require("./../../system/data/media/chill.json");

module.exports.config = {
  name: "chill",
  version: "1.0.1",
  role: 0,
  author: "Hung",
  info: "",
  Category: "Giải trí",
  guides: "",
  cd: 0,
  denpendencies: {
    "fs-extra": "",
    "request": ""
  }

};
module.exports.onEvent = async ({ api, event,Users, Threads }) => {
  let name = await Users.getNameUser(event.senderID);
  let mentions = [];
  mentions.push({
    tag: name,
    id: event.senderID
  });
  const chill = link[Math.floor(Math.random() * link.length)];

  if (event.body.indexOf("Chill")==0 || (event.body.indexOf("chill")==0) || 
event.body.indexOf("nhạc")==0) {
    api.sendMessage({body: `Chúc bạn ${name} nghe nhạc vui vẻ 🥰`, attachment: await global.tools.streamURL(chill, 'mp3'), mentions}, event.threadID, event.messageID);
}
}
module.exports.onCall = async({api,event,args,Users,Threads,Currencies}) => {

   };
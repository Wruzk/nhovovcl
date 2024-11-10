const axios = require('axios');
const path = require('path');
const fs = require('fs');

function streamURL(url, type) {
  return axios.get(url, {
    responseType: 'arraybuffer'
  }).then(res => {
    const filePath = path.join(__dirname, `/cache/${Date.now()}.${type}`);
    fs.writeFileSync(filePath, res.data);
    setTimeout(() => fs.unlinkSync(filePath), 1000 * 60);
    return fs.createReadStream(filePath);
  });
}

module.exports = {
  config: {
    name: "cosplay",
    aliases: ["cos"],
    version: "1.0.0",
    role: 0,
    author: "Hà Mạnh Hùng",
    info: "Kho ảnh cosplay (18+ ☠️)",
    Category: "Giải trí",
    guides: "/cosplay",
    hasPrefix: false,
    cd: 5,
    images: [],
  },

  onCall: async ({ event, api, args }) => {
    const pathImage = require("./../../system/data/media/cosplay.json");
    const { threadID, messageID } = event;
    const image = pathImage[Math.floor(Math.random() * pathImage.length)]

    api.sendMessage({
      body:"Chị này có thật hongg 🥵",
      attachment: await streamURL(image, 'jpg')
    }, threadID, messageID)
  }
};

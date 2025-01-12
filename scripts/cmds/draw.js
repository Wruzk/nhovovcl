const fs = require("fs");
const axios = require("axios");
const path = require("path");

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

module.exports.config = {
  name: "vẽ",
  aliases: ['draw', 'text2img'],
  Category: "AI",
  info: "vẽ ảnh AI",
  guides: "/vẽ [viết cái gì ở đây tùy thuộc vào bạn]",
  role: 0,
  cd: 15,
  author: "hmhung",
  hasPrefix: false
}

module.exports.onCall = async function ({ api, args, event, Users }) {
  let name = await Users.getNameUser(event.senderID);
  let mentions = [];
  mentions.push({
    tag: name,
    id: event.senderID
  });
  const prompt = args.join(" ");
  const send = (msg) => api.sendMessage(msg, event.threadID, event.messageID);
  if (!prompt) {
     send("Thiếu gì điền đó ¯\\_(ツ)_/¯");
  }
  try {
    const response = await global.api.text2image(prompt);
    console.log(response);
    if (response) {
      const tenbien = await streamURL(response, 'jpg');
      send({
        body: `Đây là ảnh "${prompt}" được vẽ theo yêu cầu của bạn ${name} 💫`,
        attachment: tenbien,
        mentions
      });
    } 
  } catch (error) {
    send("Đã có lỗi xảy ra :((");
    console.error(error); 
  }
}

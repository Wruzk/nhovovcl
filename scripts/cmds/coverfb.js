module.exports.config = {
    name: "coverfb",
    version: "1.0.0",
    role: 0,
    author: "Shiron",
    info: "Tạo ảnh bìa phong cách dịch vụ facebook",
    Category: "Tiện ích",
    guides: "Tạo ảnh bìa phong cách dịch vụ facebook",
    cd: 0,
    dependencies: {
        "fs-extra": "",
        "request": "",
        "axios": ""
     }
    };
    module.exports.onCall = async function ({ api, args, event, permssion }) {
    if ((this.config.author) != "Shiron") { return api.sendMessage(`[ WARNING ] - Phát hiện credits modules ${this.config.name} đã bị thay đổi thành ${this.config.credits} bởi ADMINBOT ${global.config.BOTNAME} 😐 Dừng lại ngay!!!`, event.threadID, event.messageID)}
        const request = require('request');
      const fs = require("fs-extra")
      const axios = require("axios")
      const { threadID, messageID, senderID, body } = event;
	  let prefix = global.config.PREFIX;
      if(!args[0]) return api.sendMessage(`Vui lòng nhập tên chính!!!\nExample: "${prefix}coverfb Hùng sống chó"`, threadID, messageID)
      else return api.sendMessage(`🔍 Bạn đã chọn tên chính là: ${args.join(" ").toUpperCase()}\n\n(Reply tin nhắn này và chọn tên phụ của bạn)`,event.threadID, (err, info) => {
         return global.delta.onReply.push({
            type: "tenphu",
            name: `coverfb`,
            author: senderID,
            tenchinh: args.join(" ").toUpperCase(),
            messageID: info.messageID
          });
      },event.messageID);
    }
    module.exports.onReply = async function({ api, event, args, onReply, client, __GLOBAL, Threads, Users, Currencies }) {
      module.exports.circle = async (image) => {
        const jimp = require("jimp")
        image = await jimp.read(image);
        image.circle();
        return await image.getBufferAsync("image/png");
      }
      if (onReply.author != event.senderID) return;
      const { threadID, messageID, senderID, body } = event;
      const { loadImage, createCanvas } = require("canvas");
      const request = require('request');
      const fs = require("fs-extra")
      const axios = require("axios")
      let pathImg = __dirname + `/cache/${senderID+20}.png`;
      let pathAva = __dirname + `/cache/${senderID+30}.png`;
      let pathLine = __dirname + `/cache/${senderID+40}.png`;
      const path = require("path")
      const Canvas = require("canvas")
      const __root = path.resolve(__dirname, "cache");
      var tenchinh = onReply.tenchinh;
      //=================CONFIG TEXT=============//
      switch (onReply.type) {
        case "tenphu": {
          var tenchinh = onReply.tenchinh;
          api.unsendMessage(onReply.messageID);
          return api.sendMessage(`🔍 Bạn đã chọn tên phụ là ${event.body.toUpperCase()}\n\n(Reply tin nhắn này nhập vào số điện thoại của bạn)`,threadID, function (err, info) {
            return global.delta.onReply.push({
              type: "sdt",
              name: `coverfb`,
              author: senderID,
              tenphu: event.body,
              tenchinh: tenchinh,
              messageID: info.messageID
            });
          },messageID)
        }
        case "sdt": {
          api.unsendMessage(onReply.messageID);
          return api.sendMessage(`🔍 Bạn đã chọn SDT là : ${event.body.toUpperCase()}\n\(Reply tin nhắn này để nhập email của bạn)`,threadID, function (err, info) {
            return global.delta.onReply.push({
              type: "email",
              name: `coverfb`,
              author: senderID,
              sdt: event.body,
              tenchinh: onReply.tenchinh,
              tenphu: onReply.tenphu,
              messageID: info.messageID
            });
          },messageID) 
        }
        case "email": {
          api.unsendMessage(onReply.messageID);
          return api.sendMessage(`🔍 Bạn đã chọn email là : ${event.body.toUpperCase()}\n\(Reply tin nhắn này để nhập địa chỉ của bạn)`,threadID, function (err, info) {
            return global.delta.onReply.push({
              type: "color",
              name: `coverfb`,
              author: senderID,
              sdt: onReply.sdt,
              tenchinh: onReply.tenchinh,
              tenphu: onReply.tenphu,
              email: event.body,
              messageID: info.messageID
            });
          },messageID) 
        }
        case "color": {
          api.unsendMessage(onReply.messageID);
          return api.sendMessage(`🔍 Bạn đã chọn địa chỉ là : ${event.body.toUpperCase()}\nReply tin nhắn này để nhập màu nền của bạn(Bằng tiếng Anh! Nhập no là màu mặc định)`,threadID, function (err, info) {
            return global.delta.onReply.push({
              type: "create",
              name: `coverfb`,
              author: senderID,
              sdt: onReply.sdt,
              tenchinh: onReply.tenchinh,
              tenphu: onReply.tenphu,
              diachi: event.body,
              email: onReply.email,
              messageID: info.messageID
            });
          },messageID) 
        }
        case "create": {
          var color = event.body
          if (color.toLowerCase() == "no") var color = `#ffffff`
          var address = onReply.diachi.toUpperCase()
          var name = onReply.tenchinh.toUpperCase()
          var email = onReply.email.toUpperCase()
          var subname = onReply.tenphu.toUpperCase()
          var phoneNumber = onReply.sdt.toUpperCase()
          api.unsendMessage(onReply.messageID);
          api.sendMessage(`⏳ Đang khởi tạo chương trình tạo ảnh!`,threadID, (err, info) => {
          setTimeout(() => {
                  api.unsendMessage(info.messageID);
         }, 1000);
              }, messageID);
          //=================CONFIG IMG=============//
          let token = global.account.token.EAAD6V7;
          let avtAnime = (
            await axios.get(encodeURI(
              `https://graph.facebook.com/${senderID}/picture?height=1500&width=1500&access_token=${token}`),
              { responseType: "arraybuffer" }
            )
          ).data;
          let background = (
            await axios.get(encodeURI(`https://1.bp.blogspot.com/-ZyXHJE2S3ew/YSdA8Guah-I/AAAAAAAAwtQ/udZEj3sXhQkwh5Qn8jwfjRwesrGoY90cwCNcBGAsYHQ/s0/bg.jpg`), {
              responseType: "arraybuffer",
            })
          ).data;
          let hieuung = (
            await axios.get(encodeURI(`https://1.bp.blogspot.com/-zl3qntcfDhY/YSdEQNehJJI/AAAAAAAAwtY/C17yMRMBjGstL_Cq6STfSYyBy-mwjkdQwCNcBGAsYHQ/s0/mask.png`), {
              responseType: "arraybuffer",
            })
          ).data;
          fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));
          fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
          fs.writeFileSync(pathLine, Buffer.from(hieuung, "utf-8"));
          var avatar = await this.circle(pathAva);
          //=================DOWNLOAD FONTS=============//
          if(!fs.existsSync("./system/data/tad/UTMAvoBold.ttf")) { 
              let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1DuI-ou9OGEkII7n8odx-A7NIcYz0Xk9o&export=download`, { responseType: "arraybuffer" })).data;
               fs.writeFileSync(`./system/data/tad/UTMAvoBold.ttf`, Buffer.from(getfont2, "utf-8"));
            };
          //=================DRAW BANNER=============//
          let baseImage = await loadImage(pathImg);
          let baseAva = await loadImage(avatar);
          let baseLine = await loadImage(pathLine);
          let canvas = createCanvas(baseImage.width, baseImage.height);
          let ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
          Canvas.registerFont(`./system/data/tad/UTMAvoBold.ttf`, { family: "UTMAvoBold" });
          ctx.strokeStyle = "rgba(255,255,255, 0.2)";
          ctx.lineWidth = 3;
          ctx.font = "100px UTMAvoBold";
          ctx.strokeText(name, 30, 100);
          ctx.strokeText(name, 130, 200);
          ctx.textAlign = "right";
          ctx.strokeText(name, canvas.width - 30, canvas.height - 30);
          ctx.strokeText(name, canvas.width - 130, canvas.height - 130);
          ctx.fillStyle = `#ffffff`
          ctx.font = "55px UTMAvoBold";
          ctx.fillText(name, 680, 270);
          ctx.font = "40px UTMAvoBold";
          ctx.fillStyle = "#fff";
          ctx.textAlign = "right";
          ctx.fillText(subname, 680, 320);
          ctx.font = "23px UTMAvoBold";
          ctx.fillStyle = "#fff";
          ctx.textAlign = "start";
          ctx.fillText(phoneNumber, 1350, 252);
          ctx.fillText(email, 1350, 332);
          ctx.fillText(address, 1350, 410);
          ctx.globalCompositeOperation = "destination-out";
          ctx.drawImage(baseLine, 0, 0, canvas.width, canvas.height);
          ctx.globalCompositeOperation = "destination-over";
          ctx.fillStyle = color
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.globalCompositeOperation = "source-over";
          ctx.drawImage(baseAva, 824, 180, 285, 285);
          const imageBuffer = canvas.toBuffer();
          fs.writeFileSync(pathImg, imageBuffer);
          return api.sendMessage(
            { attachment: fs.createReadStream(pathImg) },
            threadID,messageID
          );
        }
      }
             }
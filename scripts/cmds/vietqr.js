const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "vietqr",
    aliases: ["vietqrpay", "qrbank"],
    version: "1.0.5",
    author: "HungDev",
    role: 0,
    Category: "Tiện ích",
    guide: "/vietqr <mã ngân hàng> | <số tài khoản> | <tên tài khoản> | <nội dung> | <số tiền>",
  },

  onCall: async function({ event, api, args }) {
    const input = args.join(" ").split(" | ");

    if (input.length < 5) {
      return api.sendMessage("Vui lòng nhập đúng cú pháp: /vietqr <mã ngân hàng> | <số tài khoản> | <tên tài khoản> | <nội dung> | <số tiền>", event.threadID, event.messageID);
    }

    const bankCode = input[0].trim();  
    const accountNumber = input[1].trim();  
    const accountName = input[2].trim();    
    const content = input[3].trim();        
    const amount = input[4].trim();       

    try {
      const bankListResponse = await axios.get('https://api.vietqr.io/v2/banks');
      const banks = bankListResponse.data.data;

      const bank = banks.find(b => b.code.toLowerCase() === bankCode.toLowerCase());

       if (!bank) {
        // Nếu mã ngân hàng không hợp lệ, gửi danh sách ngân hàng hợp lệ
        let bankListMessage = "Mã ngân hàng không hợp lệ. Vui lòng chọn một trong các ngân hàng sau:\n";
        banks.forEach((b, index) => {
          bankListMessage += `${index + 1}. ${b.shortName} - Mã ngân hàng: ${b.code}\n`;
        });
        api.sendMessage({
          body: bankListMessage
        }, event.threadID, event.messageID);
        return;
      }

      const qrLink = `https://img.vietqr.io/image/${bank.code}-${accountNumber}-compact2.jpg?amount=${amount}&addInfo=${encodeURIComponent(content)}&accountName=${encodeURIComponent(accountName)}`;

      const response = await axios({
        url: qrLink,
        method: 'GET',
        responseType: 'stream',
      });

      const imagePath = path.resolve(__dirname, 'cache', 'vietqr.jpg');
      const writer = fs.createWriteStream(imagePath);
      response.data.pipe(writer);

      writer.on('finish', () => {
        api.sendMessage({
          body: `Mã QR cho ngân hàng: ${bank.name}\nSố tài khoản: ${accountNumber}\nTên tài khoản: ${accountName}\nSố tiền: ${amount} VND\nNội dung: ${content}`,
          attachment: fs.createReadStream(imagePath)
        }, event.threadID, event.messageID);
      });

      writer.on('error', () => {
        api.sendMessage("Có lỗi xảy ra khi tải mã QR.", event.threadID, event.messageID);
      });

    } catch (error) {
      console.error(error);
      api.sendMessage("Có lỗi xảy ra khi lấy danh sách ngân hàng hoặc tạo mã QR.", event.threadID, event.messageID);
    }
  }
};

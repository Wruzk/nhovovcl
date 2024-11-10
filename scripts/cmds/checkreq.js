const axios = require('axios');
const api_url = "https://api.hamanhhung.site"

module.exports = {
  config: {
    name: "checkapi",
    aliases: ["checkreq"],
    version: "1.0.0",
    role: 2,
    author: "Hùng",
    info: "Kiểm tra số lượng request từ API",
    Category: "Admin",
    guides: "Sử dụng lệnh /checkapi để kiểm tra request từ API",
  },
  
  onCall: async ({ msg, event }) => {
    try {
      // Gửi yêu cầu đến API
      const response = await axios.get(api_url + "/other/countreq"); // Thay URL bằng API thực tế
      const data = response.data.data;
      
      let result = "Kết quả request:\n";
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          result += `${key}: ${data[key]}\n`;
        }
      }
      
      msg.reply(result);
    } catch (error) {
      console.error(error);
      msg.reply("Đã xảy ra lỗi khi kiểm tra request.");
    }
  }
};

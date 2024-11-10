const axios = require('axios');

module.exports = {
  config: {
    name: "bitcoin",
    aliases: ["btc"],
    version: "1.0.1",
    role: 0, 
    author: "Hùng",
    info: "Xem giá Bitcoin hiện tại",
    Category: "Tiện ích",
    guides: "bitcoin",
    cd: 5, 
    images: [],
  },
  onCall: async ({ event, api }) => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,vnd');
      
      const usd_price = response.data.bitcoin.usd.toLocaleString();
      const vnd_price = response.data.bitcoin.vnd.toLocaleString(); 

      const message = `
      🌐 Giá Bitcoin hiện tại:
      💵 USD: ${usd_price} đô
      🇻🇳 VNĐ: ${vnd_price} VNĐ

      🔄 Cập nhật theo CoinGecko
      `;
      return api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      return api.sendMessage('🚫 Không thể lấy giá Bitcoin lúc này. Vui lòng thử lại sau.', event.threadID, event.messageID);
    }
  }
}
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  config: {
    name: "liqi",
    version: "1.0.0",
    author: "Hùng",
    cd: 5,
    role: 0,
    info: "Lấy thông tin về skin và kỹ năng của một tướng trong Liên Quân",
    Category: "Giải trí",
    guides: "liqi <tên hero>"
  },
  onCall: async function({ api, event, args }) {
    const heroName = args.join(" ");
    if (!heroName) {
      return api.sendMessage("Bạn cần nhập tên của tướng.", event.threadID, event.messageID);
    }

    try {
      const formattedHeroName = heroName.toLowerCase().replace(/\s+/g, '-');
      const url = `https://lienquan.garena.vn/hoc-vien/tuong-skin/d/${formattedHeroName}/`;
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const skins = [];
      $('.hero__skins--detail').each((i, elem) => {
        const name = $(elem).find('h3').text().trim();
        const skinImageUrl = $(elem).find('picture img').attr('src');
        skins.push({ name, skinImageUrl });
      });

      const skills = [];
      $('.hero__skills--detail').each((i, elem) => {
        const skillName = $(elem).find('h3').text().trim();
        let skillDescription = $(elem).find('article').html().trim()
          .replace(/<br\s*[\/]?>/gi, '\n')
          .replace(/&nbsp;/g, ' ')
          .replace(/\n+/g, '\n');  
        skills.push({ skillName, skillDescription });
      });

      let msg = `🔰 Hero: *${heroName}*\n\n📜 *Kỹ năng*\n`;
      skills.forEach((skill, index) => {
        msg += `\n🔥 *Chiêu ${index + 1}: ${skill.skillName}*\n`;
        msg += `📝 *Mô tả:* ${skill.skillDescription}\n`;
        msg += `===============================`;
      });

      let skinMsg = `🎨 *Skins:*\n`;
      const attachments = [];
      for (const [index, skin] of skins.entries()) {
        skinMsg += `${index + 1}. ${skin.name}\n`;
        const attachment = await global.tools.streamURL(skin.skinImageUrl, 'jpg');
        attachments.push(attachment);
      }

      api.sendMessage(msg, event.threadID, event.messageID);

      api.sendMessage({ body: skinMsg, attachment: attachments }, event.threadID, event.messageID);

    } catch (error) {
      api.sendMessage("Không tìm thấy thông tin tướng hoặc đã có lỗi xảy ra.", event.threadID, event.messageID);
    }
  }
};

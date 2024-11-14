
module.exports = {
  config: {
    name: "abc",
    author: "Nguyên Blue, HMHung",
    Category: "Tiện ích",
    version: "1.0",
    hasPrefix: true,
    role: 0,
    cd: 3,
    info: ""
  },
  
  onCall: async ({ api, event, msg }) => {
    const res = await global.api.upscale("https://files.catbox.moe/j4fw3u.jpg")
    console.log(res)
    api.sendMessage({attachment: await global.tools.streamURL("https://files.catbox.moe/j4fw3u.jpg", "jpg")}, event.threadID, event.messageID)
  }
};

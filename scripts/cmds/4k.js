module.exports = {
  config: {
    name: "4k",
    author: "Simple",
    Category: "Tiện ích",
    version: "2.0.0",
    hasPrefix: false,
    role: 0,
    cd: 3,
    info: "Công cụ tăng độ phân giải hình ảnh."
  },
  
  onCall: async ({ api, event, Users }) => {
    if (!event.messageReply || !event.messageReply.attachments) {
      return api.sendMessage("⚠️ Hình ảnh không hợp lệ, vui lòng phản hồi một ảnh nào đó", event.threadID, event.messageID);
    }

    const attachments = event.messageReply.attachments;
    if (attachments.length === 0) {
      return api.sendMessage("⚠️ Không có hình ảnh được phản hồi", event.threadID, event.messageID);
    }

    const imageAttachment = attachments[0];
    if (!imageAttachment.url) {
      return api.sendMessage("⚠️ Không tìm thấy đường dẫn hình ảnh", event.threadID, event.messageID);
    }

    try {

      api.setMessageReaction("⌛", event.messageID, () => {}, true);
      const response = await global.api.upscalev2(imageAttachment.url);
      const imageUrl = response.upscaled_image;
      if (!imageUrl) {

        return api.sendMessage("⚠️ Không thể làm nét ảnh", event.threadID, event.messageID);
      }

      const name = await Users.getNameUser(event.senderID);

      api.sendMessage({
        body: `Làm Nét Thành Công Theo Yêu Cầu Của Bạn "${name}"!`,
        attachment: await global.tools.streamURL(imageUrl, 'jpg')}, event.threadID, (err, info) => {
          api.setMessageReaction("☑️", event.messageID, () => {}, true)
        },event.messageID);
    } catch (error) {
      console.error(error);
      return api.sendMessage("⚠️ Có lỗi xảy ra", event.threadID, event.messageID);
    }
  }
};

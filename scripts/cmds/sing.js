const fs = require('fs');
const ytdl = require('youtube-dl-exec');
const { createReadStream, unlinkSync, statSync } = require("fs-extra");
const axios = require("axios");
const Youtube = require('youtube-search-api');

this.config = {
    name: "sing",
    aliases: ["music"],
    version: "1.0.0",
    role: 0,
    credits: "DongDev, fix by M.Hùng",
    info: "Phát nhạc thông qua từ khoá tìm kiếm trên YouTube",
    Category: "Tiện ích",
    guides: "[searchMusic]",
    cd: 0,
    hasPrefix: true,
    images: [],
};

async function getdl(url, path) {
    try {
        await ytdl(url, {
            output: path
          })
        return "ok"
    } catch (error) {
        return console.log(error)
    }
}

this.onReply = async function ({ api, event, onReply }) {
    const id = onReply.link[event.body - 1];
    const path = `${__dirname}/cache/sin-${event.senderID}.mp3`;

    try {
        await getdl(`https://www.youtube.com/watch?v=${id}`, path).then(() => {
            if (statSync(path).size > 26214400) {
                return api.sendMessage('❎ File quá lớn, vui lòng chọn bài khác!', event.threadID, () => unlinkSync(path), event.messageID);
            }

            api.unsendMessage(onReply.messageID, event.threadID);
            return api.sendMessage({
                body: `[ Âm Nhạc Từ YouTube ]\n──────────────────\n|› 🎬 Title: ${onReply.vdTitle[event.body - 1]}\n|› 📥 Link tải: https://www.youtubepp.com/watch?v=${id}`,
                attachment: createReadStream(path)
            }, event.threadID, () => unlinkSync(path), event.messageID);

        })
    } catch (error) {
        console.log(error);
        return api.sendMessage('❎ Đã xảy ra lỗi, vui lòng thử lại sau!\n' + error, event.threadID, event.messageID);
    }
};

this.onCall = async function ({ api, event, args }) {
    if (!args.length) return api.sendMessage('❎ Phần tìm kiếm không được để trống!', event.threadID, event.messageID);

    const keywordSearch = args.join(" ");
    try {
        const data = await Youtube.GetListByKeyword(keywordSearch, false, 8);
        let link = [];
        let vdTitle = [];
        const msg = data.items.map((value, index) => {
            link.push(value.id);
            vdTitle.push(value.title);
            const length = value.length?.simpleText || "Không có";
            return `|› ${index + 1}. ${value.title}\n|› 👤 Kênh: ${value.channelTitle || "Không có thông tin"}\n|› ⏱️ Thời lượng: ${length}\n──────────────────`;
        }).join('\n');

        return api.sendMessage(`📝 Có ${link.length} kết quả trùng với từ khóa tìm kiếm của bạn:\n──────────────────\n${msg}\n\n📌 Reply (phản hồi) STT để tải nhạc`, event.threadID, (error, info) => {
            global.delta.onReply.push({
                type: 'reply',
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                vdTitle,
                link
            });
        }, event.messageID);
    } catch (error) {
        console.log(error);
        return api.sendMessage('❎ Đã xảy ra lỗi, vui lòng thử lại sau!', event.threadID, event.messageID);
    }
};

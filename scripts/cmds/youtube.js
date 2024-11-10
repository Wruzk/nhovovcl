const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");
const ytdl = require('@distube/ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const moment = require('moment-timezone');

module.exports.config = {
    name: "youtube",
    version: "1.0.0",
    aliases: ['ytb'],
    info: "Tìm video hoặc nhạc trên youtube",
    role: 0,
    Category: "Tiện ích",
    author: "Hùng",
    cd: 0,
};

module.exports.onLoad = () => {
    const dirMaterial = __dirname + `/noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "ytb.jpeg")) request("https://i.imgur.com/k0VJ9lA.jpeg").pipe(fs.createWriteStream(dirMaterial + "ytb.jpeg"));
}

const mediaSavePath = __dirname + '/cache/Youtube/';
const key = "AIzaSyC0WVcVtVsD62iRWxeNkcb0o1qzbJGASqc";

module.exports.onReply = async function ({ api, event, onReply }) {
    const { threadID, messageID, body, senderID } = event;
    const { author, videoID, IDs, type: reply_type } = onReply;
    if (senderID != author) return;

    const currentTime = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:s');

    const downloadMedia = async (videoID, type) => {
        const filePath = `${mediaSavePath}${Date.now()}${senderID}.${(type == 'video') ? 'mp4' : 'm4a'}`;
        const errObj = {
            filePath,
            error: 1
        };
        try {
            const mediaObj = {
                filePath,
                error: 0
            }

            let ytdlOptions;

            if (!fs.existsSync(mediaSavePath)) fs.mkdirSync(mediaSavePath, { recursive: true });

            if (type == 'video') {
                ytdlOptions = { quality: '18' };
            } else {
                ytdlOptions = { filter: 'audioonly' };
            }
            await new Promise((resolve, reject) => {
                const startTime = Date.now();
                const stream = ytdl('https://www.youtube.com/watch?v=' + videoID, ytdlOptions);

                if (type == 'video') {
                    stream
                        .pipe(fs.createWriteStream(filePath))
                        .on('error', (err) => {
                            reject(err);
                        })
                        .on('close', () => {
                            resolve();
                        });
                } else {
                    ffmpeg.setFfmpegPath(ffmpegInstaller.path);

                    ffmpeg(stream)
                        .audioCodec("aac")
                        .save(filePath)
                        .on("error", err => {
                            reject(err);
                        })
                        .on("end", () => {
                            console.log('Đã tải xuống, chuyển đổi trong ' + (Date.now() - startTime) + 'ms');
                            resolve();
                        });
                }

            });

            return mediaObj;
        } catch (e) {
            console.log(e);
            return errObj;
        }
    }

    switch (reply_type) {
        case 'download':
            {
                const { filePath, error } = await downloadMedia(videoID, body == '1' ? 'video' : 'audio');

                const mediaData = {
                    title: (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&key=${key}`)).data.items[0].snippet.title,
                    duration: prettyTime((await axios.get(encodeURI(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoID}&key=${key}`))).data.items[0].contentDetails.duration)
                }

                if (error != 0) {
                    api.sendMessage('[⚜️]➜ Đã có lỗi xảy ra', threadID, messageID);
                    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                } else {
                    api.unsendMessage(onReply.messageID);
                    if ((fs.statSync(filePath).size > 50331648 && body == 1) || (fs.statSync(filePath).size > 26214400 && body == 2)) {
                        api.sendMessage('[⚜️]➜ Không thể gửi vì kích thước tệp quá lớn', threadID, messageID);
                        fs.unlinkSync(filePath);
                    } else {
                        api.sendMessage({
                            body: `=====『 𝗬𝗢𝗨𝗧𝗨𝗕𝗘 』=====\n\n[⚜️]➜ 𝗧𝗶𝗲̂𝘂 đ𝗲̂̀: ${mediaData.title}\n[⚜️]➜ 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${mediaData.duration}`,
                            attachment: fs.createReadStream(filePath)
                        }, threadID, (err) => {
                            if (err) {
                                console.log(err);
                                api.sendMessage('[⚜️]➜ Đã có lỗi xảy ra', threadID, messageID);
                            }
                            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                        }, messageID);
                    }
                }
                break;
            }
        case 'list':
            {
                if (isNaN(body) || body < 1 || body > IDs.length) {
                    api.sendMessage('[⚜️]➜ Vui lòng chọn số từ 1 đến ' + IDs.length, threadID, messageID);
                } else {
                    api.unsendMessage(onReply.messageID);
                    const chosenIndex = parseInt(body) - 1;
                    const chosenID = IDs[chosenIndex];
                    api.sendMessage({
                        body: '====『 𝗬𝗢𝗨𝗧𝗨𝗕𝗘 𝗟𝗨̛̣𝗔 𝗖𝗛𝗢̣𝗡 』====\n[⚜️]➜ 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗽𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝘃𝗼̛́𝗶 𝗰𝗮́𝗰 𝗹𝘂̛̣𝗮 𝗰𝗵𝗼̣𝗻 𝗱𝘂̛𝗼̛́𝗶 đ𝗮̂𝘆:\n\n𝟭. 𝗧𝗮̉𝗶 𝘃𝗶𝗱𝗲𝗼 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗰𝗵𝗼̣𝗻 𝗯𝗲̂𝗻 𝘁𝗿𝗲̂𝗻 ❤️\n𝟮. 𝗧𝗮̉𝗶 𝗮̂𝗺 𝘁𝗵𝗮𝗻𝗵 𝗰𝘂̉𝗮 𝘃𝗶𝗱𝗲𝗼 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗰𝗵𝗼̣𝗻 𝗽𝗵𝗶́𝗮 𝘁𝗿𝗲̂𝗻 💙',
                        attachment: fs.createReadStream(__dirname + `/noprefix/ytb.jpeg`)
                    }, threadID,
                        (error, info) => {
                            if (error) {
                                console.log(error);
                                api.sendMessage('[⚜️]➜ Lỗi khi thực hiện yêu cầu', threadID, messageID);
                            } else {
                                global.Furina.onReply.push({
                                    type: 'download',
                                    name: this.config.name,
                                    messageID: info.messageID,
                                    author: senderID,
                                    videoID: chosenID
                                })
                            }
                        },
                        messageID);
                }

            }
    }
}

module.exports.onCall = async function ({ api, event, args }) {
    const { threadID, messageID, senderID } = event;

    if (args.length == 0) return api.sendMessage('[⚜️]➜ Phần tìm kiếm không được để trống', threadID, messageID);
    const input = args.join(' ');
    const urlPatten = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm;
    const isValidUrl = urlPatten.test(input);

    const getBasicInfo = async (keyword) => {
        try {
            const mediaData = (await axios.get(encodeURI(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${keyword}&type=video&key=${key}`))).data.items;
            return mediaData;
        } catch (e) {
            throw e;
        }
    }

    try {
        if (isValidUrl) {
            let videoID = input.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
            videoID = (videoID[2] !== undefined) ? videoID[2].split(/[^0-9a-z_\-]/i)[0] : videoID[0];

            api.sendMessage({
                body: '====『 𝗬𝗢𝗨𝗧𝗨𝗕𝗘 𝗟𝗨̛̣𝗔 𝗖𝗛𝗢̣𝗡 』====\n[⚜️]➜ Vui lòng phản hồi tin nhắn này với các lựa chọn dưới đây:\n\n𝟭. Tải video của bạn chọn bên trên ❤️\n𝟮. Tải âm thanh của video bạn chọn phía trên 💙',
                attachment: fs.createReadStream(__dirname + `/noprefix/ytb.jpeg`)
            }, threadID,
                (error, info) => {
                    if (error) {
                        console.log(error);
                        api.sendMessage('[⚜️]➜ Lỗi khi thực hiện yêu cầu', threadID, messageID);
                    } else {
                        global.Furina.onReply.push({
                            type: 'download',
                            name: this.config.name,
                            messageID: info.messageID,
                            author: senderID,
                            videoID
                        })
                    }
                },
                messageID);
        } else {
            const mediaData = await getBasicInfo(input);

            const IDs = [];
            let msg = `====『 𝗬𝗢𝗨𝗧𝗨𝗕𝗘 𝗟𝗨̛̣𝗔 𝗖𝗛𝗢̣𝗡 』====\n[⚜️]➜ 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗰𝗵𝗼̣𝗻 𝗻𝗵𝘂̛̃𝗻𝗴 𝘃𝗶𝗱𝗲𝗼 𝗽𝗵𝗶́𝗮 𝗱𝘂̛𝗼̛́𝗶 💗\n\n`;

    for (let i = 0; i < mediaData.length; i++) {
    const title = mediaData[i].snippet.title;
    const thumbnail = mediaData[i].snippet.thumbnails.default.url;
    const ID = mediaData[i].id.videoId;

    // Lấy thời gian video
    const videoDuration = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ID}&key=${key}`)).data.items[0].contentDetails.duration;
    const formattedDuration = prettyTime(videoDuration);

    msg += `${i + 1}. Title: ${title}\nTime: ${formattedDuration}\n------------\n`;
    IDs.push(ID);
}


            api.sendMessage(msg + '[⚜️]➜ Phản hồi chọn một con số bất kỳ bên dưới', threadID,
                (error, info) => {
                    if (error) {
                        console.log(error);
                        api.sendMessage('[⚜️]➜ Lỗi khi thực hiện yêu cầu', threadID, messageID);
                    } else {
                        global.Furina.onReply.push({
                            type: 'list',
                            name: this.config.name,
                            messageID: info.messageID,
                            author: senderID,
                            IDs
                        })
                    }
                },
                messageID);
        }
    } catch (e) {
        console.log(e);
        api.sendMessage('[⚜️]➜ Đã có lỗi xảy ra', threadID, messageID);
    }
};

function prettyTime(duration) {
    let hours = 0, minutes = 0, seconds = 0;
    duration = duration.replace('PT', '');
    if (duration.includes('H')) {
        [hours, duration] = duration.split('H');
    }
    if (duration.includes('M')) {
        [minutes, duration] = duration.split('M');
    }
    if (duration.includes('S')) {
        [seconds] = duration.split('S');
    }
    return `${hours != 0 ? hours + ' giờ' : ''}${minutes != 0 ? ' ' + minutes + ' phút' : ''}${seconds != 0 ? ' ' + seconds + ' giây' : ''}`;
}

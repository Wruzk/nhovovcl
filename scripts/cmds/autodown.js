const axios = require("axios");
const fs = require("fs");
const ytdl = require('@distube/ytdl-core');
const path = require("path");
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const fbdl = require("fbdl.js");
const cookies = "datr=paMUZydKhAaVArPk2ii3BJ7x;locale=vi_VN;sb=LMMUZ1-JWplDEkNU1Nbc5Fns;wd=381x550;c_user=61564467696632;fr=0GmtsMRZyPk7t0qYd.AWWlSTxBGDg6Lmqt7aB1D7BsGis.BnFKOl..AAA.0.0.BnFMPO.AWVbxLHtlyI;xs=36%3ASdOHFUAMXD1JRw%3A2%3A1729414094%3A-1%3A15810;fbl_st=101631465%3BT%3A28823597;wl_cbv=v2%3Bclient_version%3A2650%3Btimestamp%3A1729415864;vpd=v1%3B502x381x1.4187500476837158;";
const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36";
const cacheDir = path.join(__dirname, 'cache');
const { decode } = require("html-entities");

const isURL = (u) => /^http(s)?:\/\//.test(u);

exports.onEvent = async function (o) {
  try {
    const str = o.event.body;
    const send = (msg) => o.api.sendMessage(msg, o.event.threadID, o.event.messageID);
    const head = (app) => `==『 AUTODOWN ${app.toUpperCase()} 』==\n────────────────`;

    if (/xnxx/.test(str)) {
      const res = await axios.get(`https://api.hamanhhung.site/download/xnxx?url=${str}`);
      if (res.data && res.data.video_url) {
        const videoUrl = res.data.video_url;
       
          send({
            body: `${head('XNXX')}\nTiêu Đề : ${res.data.title}`,
            attachment: await streamURL(videoUrl, "mp4")
          });
      } else {
        send('Không tìm thấy video từ URL xnxx.');
      }
    } else if (o.event.attachments && o.event.attachments.type === 'share') {
          send({
            body: `${head('FACEBOOK')}`,
            attachment: await streamURL(o.event.attachments.playableUrl, 'mp4')
          });

    } else if (/threads\.net\//.test(str)) {
      let res = await global.api.threadsdl(str);
      let data = res.results;
      let vd = data.filter($ => $.type === 'video');
      let pt = data.filter($ => $.type === 'image');
      const s = attachment => send({ body: `${head('THREADS')}\n⩺ Tiêu đề: ${res.title}\n⩺ Tác giả: ${res.user.username}`, attachment });  
      Promise.all(vd.map($ => global.tools.streamURL($.url, 'mp4'))).then(r => r.filter($ => !!$).length > 0 ? s(r) : '');
      Promise.all(pt.map($ => global.tools.streamURL($.url, 'jpg'))).then(r => r.filter($ => !!$).length > 0 ? s(r) : '');
  } else if (/^https:\/\/www\.instagram\.com\//.test(str)) {
      const res = await axios.get(`https://api.hamanhhung.site/download/instagram?url=${str}`);
      if (res.data && res.data.data.videoUrl) {
        const videoUrl = res.data.data.videoUrl;
          send({
            body: `${head('INSTAGRAM')}\nTiêu Đề : ${res.data.data.title}`,
            attachment: streamURL(videoUrl, 'mp4')
          });
      } else {
        send('Không tìm thấy video từ URL Instagram.');
      }
    } else if (/(^https:\/\/)((vm|vt|www|v)\.)?(tiktok|douyin)\.com\//.test(str)) {
      const json = await infoPostTT(str);
      let attachment = [];

      if (json.images != undefined) {
        for (const img of json.images) {
          attachment.push(await streamURL(img, 'png'));
        }
      } else {
        attachment = [await streamURL(json.play, 'mp4')];
      }

      o.api.sendMessage({
        body: `${head('TIKTOK')}
•💬 𝐓𝐢𝐞̂𝐮 Đ𝐞̂̀: ${json.title}
•⏰ Thời gian: ${json.duration}s
•𝗧𝗵ả "❤"𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝘁𝗮̉𝗶 𝗻𝗵𝗮̣𝗰`,
        attachment
      }, o.event.threadID, (error, info) => {
        global.Furina.onReaction.push({
          name: this.config.name,
          messageID: info.messageID,
          author: o.event.senderID,
          data: json
        });
      }, o.event.messageID);
    } else if (/fb|facebook/.test(str)) {
                const result = await fbdl(str, cookies, userAgent);
                const encodedText = result.title;
                const decodedText = decode(encodedText);
                const videoUrl = result.hd;
                const videoPath = path.join(cacheDir, 'video.mp4');
                const audioPath = path.join(cacheDir, 'audio.mp3');
                const abc = JSON.stringify(result);
                const writer = fs.createWriteStream(videoPath);
                const response = await axios({
                    url: videoUrl,
                    method: 'GET',
                    responseType: 'stream'
                });
                response.data.pipe(writer);

                writer.on('finish', async () => {
                    const choiceMessage = `====[ AUTODOWN FACEBOOK ]====
1. 🎬 Video
2. 🎧 Nhạc\n
Hãy chọn reply stt tương ứng để tải video MP4 hoặc âm thanh MP3.`;
                    await o.api.sendMessage(choiceMessage, o.event.threadID, async (error, info) => {
                        if (error) return console.error("Error sending choice message:", error);

                        global.Furina.onReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: o.event.senderID,
                            videoPath: videoPath,
                            audioPath: audioPath,
                            decodedText: decodedText 
                        });
                        
                    });
                });

                writer.on('error', (error) => {
                    console.error("Error saving video:", error);
                });
            } else if (/(^https:\/\/)((www)\.)?(youtube|youtu)(PP)*\.(com|be)\//.test(str)) {
      const info = await ytdl.getInfo(str);
      const detail = info.videoDetails;
      const formats = info.formats;

      // Tìm định dạng video tốt nhất
      const bestVideoFormat = formats
        .filter(f => f.hasVideo && f.hasAudio) // Có video và âm thanh
        .sort((a, b) => (b.qualityLabel ? parseInt(b.qualityLabel) : 0) - (a.qualityLabel ? parseInt(a.qualityLabel) : 0))[0];

      // Tìm định dạng âm thanh tốt nhất
      const bestAudioFormat = formats
        .filter(f => f.hasAudio)
        .sort((a, b) => b.audioBitrate - a.audioBitrate)[0];

      if (bestVideoFormat) {
        o.api.sendMessage({
          body: `${head('YOUTUBE MP4')}
•🎵 𝐓𝐢𝐞̂𝐮 Đ𝐞̂̀: ${detail.title}
•🙎‍♂️ 𝐀𝐮𝐭𝐡𝐨𝐫: ${detail.author.name}
•👀 𝗩𝗶𝗲𝘄𝘀: ${detail.viewCount}
•⏰ 𝗧𝗵𝗼̛̀𝗶 𝗹𝘂̛𝗼̛̣𝗻𝗴: ${detail.lengthSeconds}s
•🔗 𝐋𝐢𝐧𝐤: ${detail.video_url}
•𝗧𝗵ả "❤" để tải MP3`,
          attachment: await streamURL(bestVideoFormat.url, 'mp4')
        }, o.event.threadID, o.event.messageID);
        o.api.sendMessage({
          body: `${head('YOUTUBE MP3')}
•🎵 𝐓𝐢𝐞̂𝐮 Đ𝐞̂̀: ${detail.title}
•🙎‍♂️ 𝐀𝐮𝐭𝐡𝐨𝐫: ${detail.author.name}
•👀 𝗩𝗶𝗲𝘄𝘀: ${detail.viewCount}
•⏰ 𝗧𝗵𝗼̛̀𝗶 𝗹𝘂̛𝗼̛̣𝗻𝗴: ${detail.lengthSeconds}s
•🔗 𝐋𝐢𝐧𝐤: ${detail.video_url}
•𝗧𝗵ả "❤" để tải MP3`,
          attachment: await streamURL(bestAudioFormat.url, 'mp3')
        }, o.event.threadID, o.event.messageID);
      } else {
        console.error('Không tìm thấy định dạng phù hợp!');
        send({ body: 'Không tìm thấy định dạng video phù hợp để tải xuống.' });
      }
    } else {
      return;
    }
  } catch (error) {
    console.error('Lỗi xử lý sự kiện:', error);
  }
};

exports.onCall = () => {};

exports.onReaction = async function (o) {
  const { threadID: t, messageID: m, reaction: r } = o.event;
  const h = global.Furina.onReaction.find(e => e.messageID == m);

  if (!h || r !== "❤") return;

  o.api.sendMessage({
    body: `
====『 MUSIC TIKTOK 』====
▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱
💬 𝐓𝐢𝐞̂𝐮 Đ𝐞̂̀: ${h.data.music_info.title}
🔗 𝐋𝐢𝐧𝐤: ${h.data.music_info.play}
⏱️ 𝐓𝐡𝐨̛̀𝐢 𝐠𝐢𝐚𝐧: ${h.data.music_info.duration}
▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱`,
    attachment: await streamURL(h.data.music, "mp3")
  }, t, m);
};

exports.onReply = async (o) => {
    try {
        const { threadID, messageID, senderID } = o.event;
        const h = o.onReply;

        if (!h || (o.event.body !== "1" && o.event.body !== "2")) return;
        if (senderID !== h.author) return;

        if (o.event.body == '1') {
            o.api.unsendMessage(h.messageID);
            await o.api.sendMessage({
                body: `====[ Facebook MP4 ]====\nTitle:${h.decodedText}`, 
                attachment: fs.createReadStream(h.videoPath)
            }, threadID, messageID);
        } else if (o.event.body == '2') {
            o.api.unsendMessage(h.messageID);
            ffmpeg.setFfmpegPath(ffmpegPath);

            ffmpeg(o.onReply.videoPath)
                .noVideo()
                .audioCodec('libmp3lame')
                .save(h.audioPath)
                .on('end', async () => {
                    await o.api.sendMessage({
                        body: `====[ Facebook MP3 ]====\nTitle:${h.decodedText}`, 
                        attachment: fs.createReadStream(h.audioPath)
                    }, threadID, messageID);
                })
                .on('error', (error) => {
                    console.error("Error converting to MP3:", error);
                    o.api.sendMessage('Có lỗi xảy ra trong quá trình chuyển đổi thành MP3.', threadID, messageID);
                });
        }
    } catch (error) {
        console.error('Lỗi xử lý:', error);
    }
};

exports.config = {
  name: 'autodown',
  version: '1',
  role: 0,
  author: 'hmhung',
  info: '',
  Category: 'Tiện ích',
  guides: [],
  cd: 3
};

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

function infoPostTT(url) {
  return axios({
    method: 'post',
    url: `https://tikwm.com/api/`,
    data: {
      url
    },
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.data.data);
}

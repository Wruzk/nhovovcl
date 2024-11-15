const { chat } = require("./../../main/utils/gemini");

module.exports.config = {
    name: 'goibot',
    version: '2.0.0',
    role: 0,
    author: 'DC-Nam, Hùng, Duy Anh', 
    info: 'Trò truyện cùng Sagari chat cực thông minh (có thể ngu)',
    Category: 'Hệ thống',
    guides: '[bot]',
    cd: 2,
};

module.exports.onCall = () => {};
module.exports.onEvent = async function({
    api,
    event
}) {
    var {
        threadID,
        messageID
    } = event;
    const send = (msg) => api.sendMessage(msg, event.threadID, (err, data) => global.delta.onReply.push({
            name: this.config.name,
            messageID: data.messageID
        }), event.messageID);

    var tl = ["𝑿𝒊𝒏 𝒄𝒉𝒂̀𝒐,𝑩𝒐𝒕 𝒔𝒂̆̃𝒏 𝒔𝒂̀𝒏𝒈 𝒑𝒉𝒖̣𝒄 𝒗𝒖̣ 𝒂̣", "𝑫𝒛𝒂𝒂 𝒃𝒐𝒕 𝒅𝒂𝒚 𝒂𝒂 :𝟑𝟑", "𝑩𝒐𝒕 𝒔𝒂̆̃𝒏 𝒔𝒂̀𝒏𝒈 𝒏𝒉𝒂̣̂𝒏 𝒍𝒆̣̂𝒏𝒉 𝒕𝒖̛̀ 𝒃𝒂̣𝒏 ", "𝑰 𝒍𝒐𝒗𝒆 𝒚𝒐𝒖𝒖", "𝒀𝒆̂𝒖 𝒆𝒎𝒔 :𝒗", "𝒀𝒆̂𝒖 𝒂𝒏𝒉𝒔 :𝒗", "𝑯𝒊, 𝒄𝒉𝒂̀𝒐 𝒄𝒐𝒏 𝒗𝒐̛̣ 𝒃𝒆́:𝟑", "𝑩𝒔𝒗𝒗 𝒏𝒉𝒂𝒂", "𝑺𝒖̛̉ 𝒅𝒖̣𝒏𝒈 𝒄𝒂𝒍𝒍𝒂𝒅 𝒅𝒆̂̉ 𝒍𝒊𝒆̂𝒏 𝒍𝒂̣𝒄 𝒗𝒐̛́𝒊 𝒂𝒅𝒎𝒊𝒏 𝒏𝒆̂́𝒖 𝒃𝒂̣𝒏 𝒄𝒂̂̀𝒏 𝒉𝒐̂̃ 𝒕𝒓𝒐̛̣!", "𝑬𝒎 𝒍𝒂̀ 𝒃𝒐𝒕 𝒄𝒖𝒕𝒆 𝒏𝒉𝒂̂́𝒕 𝒉𝒂̀𝒏𝒉 𝒕𝒊𝒏𝒉", "𝑵𝒐́𝒊 𝒈𝒊̀ 𝒕𝒉𝒆̂́ 𝒄𝒐𝒏 𝒍𝒐̛̣𝒏 𝒕 𝒗𝒂̂̃𝒏 𝒍𝒖𝒐̂𝒏 𝒐̛̉ 𝒅𝒂̂𝒚 𝒏𝒉𝒆́ 😏", "𝑩𝒕𝒗𝒗 𝒏𝒉𝒂𝒂", "𝒀𝒆̂𝒖 𝒄𝒂̣̂𝒖 𝒏𝒉𝒂̂́𝒕💟", "𝑻𝒉𝒖̛𝒐̛𝒏𝒈 𝒄𝒂̣̂𝒖 𝒏𝒉𝒂̂́𝒕 🥺", "𝑼𝒘𝑼", "𝒙𝒂𝒐 𝒕𝒉𝒆̂́ 𝒄𝒐̂𝒏𝒈 𝒄𝒉𝒖́𝒂𝒂", "𝑪𝒂̣̂𝒖 𝒃𝒂̉𝒐 𝒗𝒆̣̂ 𝒕𝒉𝒆̂́ 𝒈𝒊𝒐̛́𝒊, 𝒕𝒐̛́ 𝒃𝒂̉𝒐 𝒗𝒆̣̂ 𝒄𝒂̣̂𝒖", "Chăm chỉ học hành đi", "𝑩𝒂𝒆 𝒂̆𝒏 𝒄𝒐̛𝒎 𝒄𝒉𝒖̛𝒂?", "𝑪𝒐́ 𝒕𝒂̂́𝒕 𝒄𝒂̉ 𝒏𝒉𝒖̛𝒏𝒈 𝒕𝒉𝒊𝒆̂́𝒖 𝒆𝒎 :<", "𝑵𝒆̂́𝒖 𝒄𝒂̣̂𝒖 𝒅𝒂𝒏𝒈 𝒄𝒐̂ 𝒅𝒐̛𝒏 𝒕𝒉𝒊̀ 𝒄𝒉𝒖́𝒏𝒈 𝒕𝒂 𝒄𝒐́ 𝒕𝒉𝒆̂̉ 𝒕𝒉𝒂̀𝒏𝒉 𝒅𝒐̂𝒊 :𝟑", "𝑫𝒂𝒏𝒈 𝒍𝒂̀𝒎 𝒈𝒊̀ 𝒗𝒂̣̂𝒚?", "𝑫𝒖̛𝒐̛̣𝒄 𝒄𝒖̉𝒂 𝒍𝒐́ :)))", "𝑬𝒎 𝒅𝒕𝒉𝒘 𝒏𝒉𝒖̛ 𝒄𝒉𝒖̉ 𝒄𝒖̉𝒂 𝒆𝒎 𝒂̣", "𝑫𝒖̛̀𝒏𝒈 𝒌𝒉𝒆𝒏 𝒆𝒎 𝒏𝒈𝒂̣𝒊 𝒒𝒖𝒂́ 𝒉𝒊́ 𝒉𝒊́", "𝑫𝒖̛̀𝒏𝒈 𝒔𝒑𝒂𝒎 𝒆𝒎 𝒏𝒉𝒂 :<<, 𝒄𝒂̣̂𝒖 𝒄𝒉𝒖̉ 𝒆𝒎 𝒎𝒆̣̂𝒕 𝒍𝒂̆́𝒎 𝒐̛̀𝒊", "𝑪𝒖́𝒕 𝒏𝒈𝒂𝒚 𝒔𝒑𝒂𝒎 𝒄𝒄", "𝑪𝒐̂𝒏𝒈 𝒄𝒉𝒖́𝒂 𝒄𝒖̉𝒂 𝒃𝒐𝒕 𝒔𝒂𝒐 𝒅𝒂̂́𝒚?", "𝑯𝒐𝒂̀𝒏𝒈 𝒕𝒖̛̉ 𝒄𝒖̉𝒂 𝒃𝒐𝒕 𝒔𝒂𝒐 𝒅𝒂̂́𝒚?", "𝑺𝒑𝒂𝒎 𝒄𝒄 𝒄𝒖́𝒕", "𝒀𝒆̂𝒖 𝒆𝒎 𝒌𝒉𝒐̂𝒏𝒈?", "𝑩𝒂̣𝒏 𝒃𝒊̣ 𝒍𝒂̀𝒎 𝒔𝒂𝒐 𝒊́@@", "𝑵𝒉𝒂̂́𝒕 𝒃𝒂̣𝒏,𝒃𝒂̣𝒏 𝒍𝒂̀ 𝒏𝒉𝒂̂́𝒕!!!", "𝑲𝒆̂𝒖 𝒄𝒉𝒊 𝒍𝒂̆́𝒎 𝒕𝒉𝒆̂́? 𝑩𝒐̣̂ 𝒕𝒉𝒊́𝒄𝒉 𝒕𝒂𝒐 𝒓𝒐̂̀𝒊 𝒂̀ :𝒗", "𝑬𝒎... 𝑺𝒂𝒐 𝒆𝒎 𝒍𝒂̣𝒊 𝒏𝒐́𝒊 𝒏𝒉𝒖̛̃𝒏𝒈 𝒄𝒂́𝒊 𝒍𝒐̛̀𝒊 𝒅𝒐́ 𝒄𝒉𝒊 𝒛𝒂𝒚 𝒆𝒎?", "𝒀𝒆𝒖 𝒆𝒎 𝒓𝒂𝒕 𝒏𝒉𝒊𝒆𝒖 ^^", "𝑩𝒂𝒃𝒚, 𝒕𝒂𝒌𝒆 𝒎𝒚 𝒉𝒂𝒏𝒅. 𝑰 𝒘𝒂𝒏𝒕 𝒚𝒐𝒖 𝒕𝒐 𝒃𝒆 𝒎𝒚 𝒉𝒖𝒔𝒃𝒂𝒏𝒅. 𝑪𝒂𝒖𝒔𝒆 𝒚𝒐𝒖'𝒓𝒆 𝒎𝒚 𝑰𝒓𝒐𝒏 𝑴𝒂𝒏. 𝑨𝒏𝒅 𝑰 𝒍𝒐𝒗𝒆 𝒚𝒐𝒖 𝟑𝟎𝟎𝟎 <𝟑", "𝑪𝒉𝒊̉ 𝒄𝒂̂̀𝒏 𝒂𝒏𝒉 𝒏𝒐́𝒊 𝒚𝒆̂𝒖, 𝒆𝒎 𝒔𝒆̃ 𝒃𝒂́𝒎 𝒕𝒉𝒆𝒐 𝒂𝒏𝒉 𝒔𝒖𝒐̂́𝒕 𝒅𝒐̛̀𝒊", "𝑫𝒖̛̀𝒏𝒈 𝒒𝒖𝒂́ 𝒚𝒆̂𝒖 𝒎𝒐̣̂𝒕 𝒂𝒊 𝒅𝒐́, 𝒌𝒉𝒊 𝒄𝒉𝒊́𝒏𝒉 𝒃𝒂̉𝒏 𝒕𝒉𝒂̂𝒏 𝒃𝒂̣𝒏 𝒗𝒂̂̃𝒏 𝒃𝒊̣ 𝒕𝒐̂̉𝒏 𝒕𝒉𝒖̛𝒐̛𝒏𝒈!", "𝑩𝒂𝒆, 𝒆𝒎 𝒏𝒉𝒖 𝒃𝒐𝒏𝒈 𝒉𝒐𝒂. 𝑵𝒉𝒖𝒏𝒈 𝒏𝒈𝒖𝒐𝒊 𝒉𝒂𝒊 𝒅𝒂𝒖 𝒑𝒉𝒂𝒊 𝒕𝒂 💔", "𝑶𝒗𝒆𝒓𝒏𝒊𝒈𝒉𝒕 𝒌𝒉𝒐̂𝒏𝒈?", "𝑯𝒂̃𝒚 𝒈𝒐̣𝒊 𝒄𝒉𝒐 𝒆𝒎 𝒅𝒆̂̉ 𝒅𝒖̛𝒐̛̣𝒄 𝒚𝒆̂𝒖 𝒕𝒉𝒖̛𝒐̛𝒏𝒈<𝟑", "𝑯𝒂́𝒕 𝒅𝒊 𝒄𝒉𝒐 𝒌𝒆̣𝒐 🍭"];
    var hihi = ["Dạ em nghe~", "Lói", "Sao thế?", "Dạ bot đâyy :3", "Ơi bot đây ☺", "Dạ?", "Gì thế:))", "Alo?", "Nói luôn."]
    var hehe = hihi[Math.floor(Math.random() * hihi.length)]
    var rand = tl[Math.floor(Math.random() * tl.length)]
    const idBot = await api.getCurrentUserID();
    var mention = Object.keys(event.mentions)[0];

    if (mention == idBot) {
        return send(hehe);
    } else if (event.body.indexOf("bot") == 0 || (event.body.indexOf("Bot") == 0)) {
        var msg = {
            body: rand
        }
        return send(msg);
    };
};

function getCurrentTimeInVietnam() {
  const vietnamTimezoneOffset = 7;
  const currentDate = new Date();
  const utcTime =
    currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;
  const vietnamTime = new Date(utcTime + 3600000 * vietnamTimezoneOffset);

  const daysOfWeek = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];
  const day = daysOfWeek[vietnamTime.getDay()];
  const dateString = `${day} - ${vietnamTime.toLocaleDateString("vi-VN")}`;
  const timeString = vietnamTime.toLocaleTimeString("vi-VN");

  return `${dateString} - ${timeString}`;
}

function formatUptime(seconds) {
      const days = Math.floor(seconds / (24 * 3600));
      const hours = Math.floor((seconds % (24 * 3600)) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = Math.floor(seconds % 60);
      return `${days}d : ${hours.toString().padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m : ${secs.toString().padStart(2, '0')}s`;
    }
module.exports.onReply = async function({ api, Currencies, event, Users, Threads }) {
    const [nameUser, { money }, bot_id, timenow, { threadName }, { isFriend }] = await Promise.all([
        Users.getNameUser(event.senderID),
        Currencies.getData(event.senderID),
        api.getCurrentUserID(),
        getCurrentTimeInVietnam(),
        Threads.getInfo(event.threadID),
        Users.getInfo(event.senderID)
    ]);

    const attachmentUrl = event.attachments && event.attachments[0] ? event.attachments[0].url : undefined;

    const promptMsg = {
    time: timenow,
    senderName: nameUser,
    isAdmin: global.config.ADMINBOT.includes(event.senderID),
    da_ket_ban: isFriend,
    content: event.body,
    messageID: event.messageID,
    nameGroup: threadName,
    threadID: event.threadID,
    senderID: event.senderID,
    id_cua_ban: bot_id,
    attachmentUrl: attachmentUrl
};

    const response = await chat(JSON.stringify(promptMsg));
const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
let actions


if (jsonMatch && jsonMatch[1]) {
    actions = JSON.parse(jsonMatch[1]);
} else {
    actions = JSON.parse(response);
}

for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    switch (action.type) {
        case 'chat':
            api.sendMessage(action.content, action.thread_id, (err, data) => global.delta.onReply.push({
     name: this.config.name,
    messageID: data.messageID
 }));
            break;
        case 'reply':
            api.sendMessage(action.content, action.thread_id, (err, data) => global.delta.onReply.push({
                name: this.config.name,
                messageID: data.messageID
            }), action.message_id);
            break;
        case 'react':
            api.setMessageReaction(action.icon, action.message_id, () => {}, true);
            break;
        case 'set_nickname':
            api.changeNickname(action.name, action.thread_id, action.user_id);
            break;
        case 'set_emoji':
            api.changeThreadEmoji(action.emoji, action.thread_id);
            break;
        case 'add_user_to_group':
            api.addUserToGroup(action.user_id, action.thread_id);
            break;
        case 'remove_user_from_group':
            api.removeUserFromGroup(action.user_id, action.thread_id);
            break;
        case 'add_friend':
            api.addFriends(action.user_id);
            break;
        case 'unfriend':
            api.unfriend(action.user_id);
            break
        case 'accept_friend_request':
            api.acpUsers(action.user_id);
            break;
        case 'change_avatar':
            api.changeAvt(action.link, action.caption);
            break;
        case 'share_contact':
            api.shareContact(action.text, action.user_id, action.thread_id);
            break;
        case 'change_thread_name':
            api.setTitle(action.name, action.thread_id);
        default:
            console.log('Hành động không hợp lệ:', action.type);
    }
}

};

module.exports.config = {
    name: "ping",
    version: "1.0.5",
    role: 1,
    author: "Thành lồn & HMHung",
    info: "tag toàn bộ thành viên",
    Category: "Box chat",
    guides: "[Text]",
    cd: 8
};

module.exports.onCall = async function({ api: ap, event: ev, args: ar }) {
    try {
        const att = ev.messageReply ? ev.messageReply.attachments : [],
              bID = ap.getCurrentUserID();
        var lafk, luID;
        global.moduleData["afk"] && global.moduleData["afk"].afkList
            ? (lafk = Object.keys(global.moduleData["afk"].afkList || []))
            : (lafk = []);
        luID = ev.participantIDs.filter(ID => ID != bID && ID != ev.senderID);
        luID = luID.filter(i => !lafk.includes(i));

        var b = ar.length !== 0 ? ar.join(" ") : "Hùng đã xóa bạn khỏi nhóm",
            m = [], i = 0;
        for (const uID of luID) {
            b = "‎" + b;
            m.push({ id: uID, tag: "‎", fromIndex: i - 1 });
            i -= 1;
        }

        if (att.length === 0) {
            return ap.sendMessage({ body: b, mentions: m }, ev.threadID, ev.messageID);
        } else {
            const vid = att[0];
            return ap.sendMessage(
                { body: b, attachment: await global.tools.streamURL(vid.url, 'mp4'), mentions: m },
                ev.threadID,
                ev.messageID
            );
        }
    } catch (e) {
        return console.log(e);
    }
};

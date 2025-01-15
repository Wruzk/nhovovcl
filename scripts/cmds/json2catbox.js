module.exports = class {
    static config = {
        name: "json2catbox",
        author: "hmhung",
        info: "Convert list link video qua Catbox",
        Category: "Tiện ích",
        cd: 60
    };

    static async onCall({ api, event, args }) {
        const send = (msg, callback) => api.sendMessage(msg, event.threadID, callback, callback == 0 ? undefined : event.messageID);
        const url = args.join(" ");
        if (!url) return send("Vui lòng nhập link raw là một mảng các URL!");
        cons
        for ()
    }
}
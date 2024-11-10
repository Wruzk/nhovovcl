const GoogleAuthenticator = require('../../main/utils/Authenticator');

module.exports = {
    config: {
        name: "2fa",
        author: "Nguyên Blue",
        Category: "Tiện ích",
        version: "1.0",
        role: 0,
        cd: 3,
        info: "Nhập mã và nhận về code đã giải mã từ Google Authenticator."
    },
    onCall: async ({ args, api, event }) => {
        const key = args[0];

        if (!key) {
            return api.sendMessage("Bạn cần nhập mã để giải mã!", event.threadID);
        }

        try {
            const ga = new GoogleAuthenticator();
            const code = ga.getCode(key);

            return api.sendMessage(`Code đã giải mã từ '${key}': ${code}`, event.threadID);
        } catch (error) {
            console.error("Lỗi khi giải mã:", error.message);
            return api.sendMessage(error.message, event.threadID);
        }
    }
};

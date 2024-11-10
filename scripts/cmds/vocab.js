const { get, post } = require("axios");

class Command {
    constructor(config) {
        this.config = config;
        this.correctStreak = {};
    }

    async onCall(o) {
        const send = (msg) =>
            new Promise((r) =>
                o.api.sendMessage(
                    msg,
                    o.event.threadID,
                    (err, res) => r(res || err),
                    o.event.messageID,
                ),
            );
        const vocabResponse = await get(
            "https://raw.githubusercontent.com/hmhung1/data_chatbot/main/vocabData.json",
        );
        const vocabulary = vocabResponse.data;

        const randomIndex = Math.floor(Math.random() * vocabulary.length);
        const word = vocabulary[randomIndex];

        const message = `Học English cùng gái xinh 😍

Từ vựng: "${word.word}" ${word.phonetic}

Example: "${word.example}"

Chọn nghĩa đúng:
1. ${word.options[0]}
2. ${word.options[1]}
3. ${word.options[2]}
4. ${word.options[3]}

➢ Gõ số (1-4) để chọn đáp án.`;

        const response = await send(message);
        global.Furina.onReply.push({
            name: this.config.name,
            messageID: response.messageID,
            author: o.event.senderID,
        });
        await send({
            body: "Phát âm",
            attachment: await global.tools.streamURL(
                "https://translate.google.com/translate_tts?ie=UTF-8&q=${word.example}&tl=en&client=tw-ob",
                "mp3",
            ),
        });

        this.word = word;
        this.messageID = response.messageID;
    }

    async onReply(o) {
        const a = o.onReply.messageID;
        if (
            o.event.messageReply.messageID == a &&
            /^[1-4]$/.test(o.event.body) &&
            o.event.senderID == o.onReply.author
        ) {
            const send = (msg) =>
                new Promise((r) =>
                    o.api.sendMessage(
                        msg,
                        o.event.threadID,
                        (err, res) => r(res || err),
                        o.event.messageID,
                    ),
                );

            const answer = parseInt(o.event.body);
            const correctIndex =
                this.word.options.indexOf(this.word.definition) + 1;

            if (!this.correctStreak[o.event.senderID]) {
                this.correctStreak[o.event.senderID] = 0;
            }

            if (answer === correctIndex) {
                this.correctStreak[o.event.senderID] += 1;
                const reward = 10000 * this.correctStreak[o.event.senderID];

                const girlResponse = await get(
                    "https://raw.githubusercontent.com/hmhung1/data_chatbot/main/girl.json",
                );
                const girlArray = girlResponse.data;
                const girlRandomIndex =
                    girlArray[Math.floor(Math.random() * girlArray.length)];
                await send({
                    body: "Giỏi quá ta! Em thưởng nè 🤭\nBạn đã trả lời đúng ${this.correctStreak[o.event.senderID]} câu liên tiếp.\n<!> Số dư +${reward}",
                    attachment: await global.tools.streamURL(
                        girlRandomIndex,
                        "jpg",
                    ),
                });

                o.Currencies.increaseMoney(o.event.senderID, reward);
                o.api.unsendMessage(a);
                const vocabResponse = await get(
                    "https://raw.githubusercontent.com/hmhung1/data_chatbot/main/vocabData.json",
                );
                const vocabulary = vocabResponse.data;

                const randomIndex = Math.floor(
                    Math.random() * vocabulary.length,
                );
                const word = vocabulary[randomIndex];

                const nextMessage = `Tiếp tục nào 😍

Từ vựng: "${word.word}" ${word.phonetic}

Example: "${word.example}"

Chọn nghĩa đúng:
1. ${word.options[0]}
2. ${word.options[1]}
3. ${word.options[2]}
4. ${word.options[3]}

➢ Gõ số (1-4) để chọn đáp án.`;

                const nextResponse = await send(nextMessage);
                global.Furina.onReply.push({
                    name: this.config.name,
                    messageID: nextResponse.messageID,
                    author: o.event.senderID,
                });
                await send({
                    body: "Phát âm",
                    attachment: await global.tools.streamURL(
                        `https://translate.google.com/translate_tts?ie=UTF-8&q=${word.example}&tl=en&client=tw-ob`,
                        "mp3",
                    ),
                });
            } else {
                await send("Sai rồi nha!");
                this.correctStreak[o.event.senderID] = 0;
            }
        }
    }
}

module.exports = new Command({
    name: "vocab",
    version: "0.0.1",
    role: 0,
    author: "hmhung",
    info: "Học từ vựng tiếng Anh",
    Category: "Game",
    guides: "[vocab]",
    cd: 0,
    hasPrefix: true,
});

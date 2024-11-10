const links = require('./../../system/data/media/vdgai.json'); 
const thinh = require('./../../system/data/thinh.json');
class Command {
    constructor(config) {
        this.config = config;
        };
    


    async onEvent(o) {
      
const randomThinh = thinh[Math.floor(Math.random() * thinh.length)];
const title = randomThinh;
      const body = o.event.body.toLowerCase();
      const keywords = ["gái", "múp", "mup", "gai", "girl"];
    
      if (keywords.some(keyword => body.startsWith(keyword))) {
          const send = (msg) => new Promise((r) => 
              o.api.sendMessage(msg, o.event.threadID, (err, res) => r(res || err), o.event.messageID)
          );

          send({
              body: title,
              attachment: global.Furina.queues.splice(0, 1),
          });
      }
    }
  
    async onCall(o) {
        const send = msg => new Promise(r => o.api.sendMessage(msg, o.event.threadID, (err, res) => r(res || err), o.event.messageID));

        send({
            body: "🚫 Chưa nhập tên lệnh.",
            attachment: global.Furina.queues.splice(0, 1),
        });
    }
}


module.exports = new Command({
    name: '\n',
    version: '0.0.1',
    role: 0,
    author: 'Niio-team (DC-Nam)',
    info: 'Video gái',
    Category: 'Giải trí',
    guides: '[]',
    cd: 0,
    hasPrefix: true,
});

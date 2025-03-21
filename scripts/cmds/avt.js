module.exports.config = {
	name: "avt",
	version: "1.0.0",
	role: 0,
	author: "DuyVuong",
	info: "lấy avt người dùng bằng id",
	Category: "Tiện ích",
	cd: 0
};

module.exports.onCall = async function({ api, event, args, Threads }) {
const request = require("request");
const fs = require("fs")
const axios = require("axios")
const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
const mn = this.config.name
if (!args[0]) return api.sendMessage(`${prefix}${mn} box -> get avt của nhóm bạn\n${prefix}${mn} id + id -> get ảnh theo uid người đó\n${prefix}${mn} user -> để trống là get avatar của chính người dùng lệnh\n${prefix}${mn} user + @tag -> get avatar người được tag`,event.threadID,event.messageID);
  if (args[0] == "box") {
           if(args[1]){ let threadInfo = await Threads.getInfo(args[1]);
           let imgg = threadInfo.imageSrc;
       if(!imgg) api.sendMessage(`Avata của box ${threadInfo.threadName} đây`,event.threadID,event.messageID);
        else var callback = () => api.sendMessage({body:`Avata box ${threadInfo.threadName} đây`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID); 
      return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
             }    
          
            let threadInfo = await Threads.getInfo(event.threadID);
            let img = threadInfo.imageSrc;
          if(!img) api.sendMessage(`✅ Avata của box ${threadInfo.threadName} đây`,event.threadID,event.messageID)
          else  var callback = () => api.sendMessage({body:`✅ Avata của box ${threadInfo.threadName} đây`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);   
      return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    
}
else if (args[0] == "id") {
	try {
	var id = args[1];
  if (!id) return api.sendMessage(`❎ Vui lòng nhập uid cần get avt`,event.threadID,event.messageID);
   var callback = () => api.sendMessage({attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
   return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=${global.account.token.EAAD6V7}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
 }
 catch (e) {
 	api.sendMessage(`⚠️ Không thể lấy ảnh người dùng`,event.threadID,event.messageID);
 }
}
else if (args[0] == "link") {
var link = args[1];
if (!link) return api.sendMessage(`❎ Vui lòng nhập link cần get avt`,event.threadID,event.messageID);
var tool = require("fb-tools");
try {
var id = await tool.findUid(args[1] || event.messageReply.body);
var callback = () => api.sendMessage({attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=${global.account.token.EAAD6V7}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
}
catch(e){
    api.sendMessage("⚠️ Người dùng không tồn tại",event.threadID,event.messageID)
}
}
else if(args[0] == "user") {
	if (!args[1]) {
		var id = event.senderID;
		var callback = () => api.sendMessage({attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
    return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=${global.account.token.EAAD6V7}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
	}
	else if (args.join().indexOf('@') !== -1) {
		var mentions = Object.keys(event.mentions)
		var callback = () => api.sendMessage({attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
    return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?height=720&width=720&access_token=${global.account.token.EAAD6V7}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
	}
	else {
		api.sendMessage(`❎ Bạn đã dùng sai lệnh Ghi ${prefix}${mn} để xem các lệnh của module`,event.threadID,event.messageID);
	}
}
else {
	api.sendMessage(`❎ Bạn đã dùng sai lệnh Ghi ${prefix}${mn} để xem các lệnh của module`,event.threadID,event.messageID);
}
}

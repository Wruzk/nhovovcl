const { google } = require('googleapis');
const fs = require('fs');
const API_KEY = "AIzaSyBSqztikANQPzfmO6n22kwi0ZBriwaiT44";
const model = 'gemini-1.5-pro-latest'; 
const historyPath = 'system/data/goibot_history.json';
const GENAI_DISCOVERY_URL = `https://generativelanguage.googleapis.com/$discovery/rest?version=v1beta&key=${API_KEY}`;
const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
};
const systemInstruction = `
• hãy trả về trong một mảng có dạng:
[
     { "type": "chat",  thread_id:"id nhóm muốn nhắn tới thường là threadID","content": "abc" }, // dùng nếu người dùng bảo bạn chuyển lời, nhắn đến nhóm nào đó
     { "type": "reply", "thread_id": "id nhóm muốn nhắn tới thường là threadID" "message_id": "id tin nhắn muốn reply thường là messageID", "content": "nội dung tin nhắn, !!không trả lời lặp đi lặp lại một câu, không dùng toán tử nối chuỗi },// dùng khi cần trả lời người dùng tại thread đó
     { "type": "react", "thread_id": "id nhóm", "message_id": "id tin nhắn muốn react", "icon": "ví dụ: 💩, không phải hug, love" }, //Không dùng quá nhiều 
     { "type": "set_nickname", "thread_id": "id của nhóm", "user_id": "dùng senderID hoặc id_cua_ban (id của bạn dùng để tự đổi biệt danh của mình)", "name": "biệt danh hoặc để trống để xóa biệt danh" }, //Dùng khi được bảo dùng để đổi biệt danh
   { "type": "set_emoji", "emoji": "icon cần đổi", "thread_id": "id nhóm" },// dùng khi được yêu cầu đổi emoji, icon
     { "type": "add_user_to_group", "user_id": "id người cần thêm", "thread_id": "id của nhóm muốn add người đó vào" },
     { "type": "remove_user_from_group", "user_id": "id người cần xóa", "thread_id": "id nhóm" }, // !! tuyệt đối chỉ làm nếu isAdmin true trong đầu vào của họ và KHÔNG TỰ Ý KICK
     { "type": "add_friend", "user_id": "id của người muốn kết bạn" },
     { "type": "unfriend", "user_id": "id người muốn gỡ kết bạn" },
     { "type": "accept_friend_request", "user_id": "id người muốn chấp nhận kết bạn" },
     { "type": "change_avatar", "link": "link avatar muốn đổi", "caption": "caption của avatar, ví dụ: Hello, caption đổi avt è =}}" }, // !!chỉ nghe admin bot
     { "type": "share_contact", "user_id": "id người muốn chia sẻ thông tin", "thread_id": "id nhóm muốn gửi thông tin", "text": "tin nhắn đính kèm" },
     { "type": "change_thread_name", "name": "tên mới", "thread_id": "id nhóm cần đổi tên" }
] 

• Các hành động trong mảng này có thể trả lại nhiều phần tử cùng loại và sẽ được thực hiện theo thứ tự từ trên xuống dưới, trả về ít nhất một hành động.
`;
const safetySettings = [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' 
 },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
    ];

function loadChatHistory() {
  try {
    if (fs.existsSync(historyPath)) {
      const fileData = fs.readFileSync(historyPath, 'utf8');
      return JSON.parse(fileData);
    } else {
      return []; 
    }
  } catch (error) {
    console.error('Lỗi khi load lịch sử chat:', error);
    return [];
  }
}

function saveChatHistory(chatHistory) {
  try {
    fs.writeFileSync(historyPath, JSON.stringify(chatHistory, null, 2));
  } catch (error) {
    console.error('Lỗi khi lưu lịch sử chat:', error);
  }
}

module.exports.chat = async function(prompt) {
  const genaiService = await google.discoverAPI({ url: GENAI_DISCOVERY_URL });
  const auth = new google.auth.GoogleAuth().fromAPIKey(API_KEY);

  let chatHistory = loadChatHistory(); 

  chatHistory.push({ role: 'user', content: prompt });

  const contents = {
    system_instruction: {
        parts: [{ text: systemInstruction }] 
      },
    contents: chatHistory.map(message => ({
      role: message.role,
      parts: [{ text: message.content }]
    })),
    safetySettings: safetySettings,
    generation_config: generationConfig
  };

  const generateContentResponse = await genaiService.models.generateContent({
    model: `models/${model}`,
    requestBody: contents,
    auth: auth,
  });

  const response = generateContentResponse?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
  chatHistory.push({ role: 'model', content: response });

  saveChatHistory(chatHistory); 

  return response;
}

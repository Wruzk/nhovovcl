const axios = require('axios');
const cheerio = require('cheerio');

// Hàm để crawl dữ liệu từ một URL
async function crawlUserID(url) {
  try {
    // Tải trang HTML
    const { data } = await axios.get(url);

    // Sử dụng Cheerio để phân tích cú pháp HTML
    const $ = cheerio.load(data);

    // Tìm kiếm chuỗi 'userID' trong HTML (ví dụ như trong một script tag hoặc JSON)
    const userIDPattern = /"selectedID":"(\d+)"/;

    // Tìm và in ra 'userID' nếu có
    const match = userIDPattern.exec(data);
    if (match) {
      console.log('User ID:', match[1]); // In ra userID
    } else {
      console.log('User ID không tìm thấy');
    }
  } catch (error) {
    console.error('Lỗi khi tải trang:', error.message);
  }
}

// Gọi hàm crawl với URL
const url = 'https://www.facebook.com/hmhung123';  // Thay đổi URL thành trang bạn muốn crawl
crawlUserID(url);

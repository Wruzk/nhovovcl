//Thay cre = cả họ ung thư tinh hoàn :v
const { post, get: rq } = require("axios");
const base_url = "https://www.tikwm.com";

module.exports = class {
    static config = {
        name: "crawltikuser",
        aliases: ["ctuv"],
        version: "1.0.0",
        role: 0,
        author: "hmhung",
        info: "",
        Category: "Admin",
        guides: "",
        cd: 5,
        hasPrefix: true,
        images: []
    };

    static async onCall(o) {
        const { api, event, args } = o;
        const user = args.join(" ");
        const send = (msg, callback) => api.sendMessage(msg, event.threadID, callback, callback == 0 ? undefined : event.messageID);

        if (!user) return send("Vui lòng nhập username Tiktok cần crawl! Ví dụ: " + global.config.PREFIX + "crawltikuser mrbeast");

        const playload = {
            unique_id: '@' + user,
            count: 12,
            cursor: 0,
            web: 1,
            hd: 1
        };

        let video_play_urls = [];
        
        try {
            let hasMore = true;
            while (hasMore) {
                const { data: res } = await post(`${base_url}/api/user/posts`, playload);
                //console.log(JSON.stringify(res, null, 4));

                if (!res || !res.data || !res.data.videos || res.data.videos.length === 0) {
                    return send("Không tìm thấy video từ tài khoản này!");
                }

                for (const video of res.data.videos) {
                    video_play_urls.push(base_url + video.play);
                }

                hasMore = res.data.hasMore;
                playload.cursor = res.data.cursor;

                await new Promise(resolve => setTimeout(resolve, 1000)); //Delay 1s vì API chỉ cho phép 1 request/s
            }

            const run_mocky = await post('https://api.mocky.io/api/mock', {
                status: 200,
                content: JSON.stringify(video_play_urls, null, 4),
                content_type: 'application/json',
                charset: 'UTF-8',
                secret: 'PhamMinhDong',
                expiration: 'never'
            });

            send(`Đây là toàn bộ ${video_play_urls.length} video đã crawl từ tài khoản Tiktok ${user}:\n${run_mocky.data.link}`); 

        } catch (error) {
            console.error(error);
            send("Đã xảy ra lỗi khi crawl video!");
        }
    }
}
export default async function handler(req, res) {
    try {
        // 只允许代理 WarframeStat
        const targetUrl = "https://api.warframestat.us/pc/zh";

        const response = await fetch(targetUrl, {
            method: "GET",
            headers: {
                "User-Agent": "WarframeProxy/1.0"
            }
        });

        const text = await response.text();

        // 原样返回 JSON
        res.status(response.status);
        res.setHeader("Content-Type", "application/json; charset=utf-8");

        // 允许跨域
        res.setHeader("Access-Control-Allow-Origin", "*");

        res.send(text);

    } catch (error) {
        res.status(502).json({
            error: "Warframe API request failed",
            message: error.message
        });
    }
}

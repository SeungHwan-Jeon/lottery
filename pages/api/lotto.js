import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const url = "https://dhlottery.co.kr/common.do?method=main";
    const response = await axios.get(url);

    // HTML 응답 데이터 확인
    console.log("HTML Response:", response.data);

    const html = response.data;
    const $ = cheerio.load(html);

    const maxNumb = $("#lottoDrwNo").text();
    if (!maxNumb) {
      throw new Error("Failed to fetch lotto number");
    }

    res.status(200).json({ maxRound: parseInt(maxNumb, 10) });
  } catch (error) {
    console.error("API Error:", error); // 에러 로그 확인
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch lotto data" });
  }
}

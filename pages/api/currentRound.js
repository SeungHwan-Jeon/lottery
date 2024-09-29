import puppeteer from "puppeteer";
import cron from "node-cron";
import { connectDB } from "@/lib/database";
import { ObjectId } from "mongodb";

// 회차 번호 업데이트 함수
export default async function updateLottoRound(req, res) {
  try {
    // 데이터 베이스 설정
    const db = (await connectDB).db("lottery");
    const roundId = new ObjectId("66f9009da30060a5737c1c08");
    let weeklyCollection = await db.collection("weekly");
    let dbRound = (
      await weeklyCollection.findOne({
        _id: roundId,
      })
    ).round;

    const browser = await puppeteer.launch({ headless: false }); // Headless 모드로 실행
    const page = await browser.newPage();

    await page.goto("https://dhlottery.co.kr/common.do?method=main");

    await page.waitForSelector("#lottoDrwNo", { timeout: 10000 });

    const currentRound = await page.$eval("#lottoDrwNo", (el) =>
      el.textContent.trim()
    );

    await browser.close();
    console.log(currentRound);

    weeklyCollection.updateOne(
      { _id: roundId },
      { $set: { round: currentRound } }
    );
    res.status(200).json(currentRound);
    // else {
    //   res.status(200).json({ message: "No update needed, round is the same." });
    // }
  } catch (error) {
    console.error("Failed to fetch or update lotto round:", error);
  }
}

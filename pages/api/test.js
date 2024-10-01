import { connectDB } from "@/lib/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const db = (await connectDB).db("lottery");
    const roundId = new ObjectId("66f9009da30060a5737c1c08");
    let weeklyCollection = await db.collection("weekly");
    let dbRound = (
      await weeklyCollection.findOne({
        _id: roundId,
      })
    ).round;
    res.status(200).json({ round: dbRound });
  } catch (error) {
    res.status(500).json({ error: "회차 정보를 가져오는 데 실패했습니다." });
  }
}

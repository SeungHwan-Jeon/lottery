import { connectDB } from "@/lib/database";
import { ObjectId } from "mongodb";

export default async function probabilityData(req, res) {
  try {
    const db = (await connectDB).db("lottery");
    const collection = db.collection("previous_rounds");
    const result = await collection
      .find({ _id: new ObjectId("66fdfb17f8af2c8ab067132c") })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

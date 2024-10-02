export default async function saveNumList(req, res) {
  const { numList } = req.body;
  const db = (await connectDB).db("lottery");
  const collection = db.collection("weekly");
  const result = await collection.insertOne({ numList });
  res.status(200).json({ result });
}

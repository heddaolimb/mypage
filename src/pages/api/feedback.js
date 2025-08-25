import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const collection = db.collection("feedbacks"); // 👈 collection du lagde i Atlas

  if (req.method === "POST") {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    await collection.insertOne({
      message,
      createdAt: new Date(),
    });

    return res.status(201).json({ message: "Feedback saved" });
  }

  if (req.method === "GET") {
    const feedbacks = await collection
      .find({})
      .sort({ createdAt: -1 }) // nyeste først
      .toArray();

    return res.status(200).json({ feedbacks });
  }

  return res.status(405).json({ error: "Method not allowed" });
}

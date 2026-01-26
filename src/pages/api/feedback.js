import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;

    // 👇 VIKTIG: bruk database-navnet direkte
    const db = client.db("portfolio"); // 🔁 bytt hvis DB-en din heter noe annet
    const collection = db.collection("feedbacks");

    if (req.method === "GET") {
      const feedbacks = await collection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      return res.status(200).json({ feedbacks });
    }

    if (req.method === "POST") {
      const { message } = req.body;

      if (!message || !message.trim()) {
        return res.status(400).json({ error: "Message required" });
      }

      await collection.insertOne({
        message,
        createdAt: new Date(),
      });

      return res.status(201).json({ ok: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

// pages/api/sentiment.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "No text provided" });
    }

    const response = await fetch(
      "https://api-inference.huggingface.co/models/dslim/bert-base-NER",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

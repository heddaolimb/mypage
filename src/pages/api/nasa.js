// pages/api/nasa.js
export default async function handler(req, res) {
  try {
    const today = new Date().toISOString().split("T")[0];

    const response = await fetch(
      `https://science.nasa.gov/apod/?date=${today}`,
    );

    if (!response.ok) {
      throw new Error(`NASA returned ${response.status}`);
    }

    const html = await response.text();

    const imageMatch = html.match(
      /<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i,
    );

    const titleMatch = html.match(
      /<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i,
    );

    // Finn APOD-forklaringen i siden
    const explanationMatch = html.match(
      /Explanation:\s*([\s\S]*?)(?=Tomorrow's picture:|<\/body>|$)/i,
    );

    const imageUrl = imageMatch ? imageMatch[1] : "";
    const title = titleMatch ? titleMatch[1] : "NASA APOD";

    let explanation = explanationMatch
      ? explanationMatch[1]
          .replace(/<[^>]+>/g, " ")
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&")
          .replace(/&#39;/g, "'")
          .replace(/&quot;/g, '"')
          .replace(/\s+/g, " ")
          .trim()
      : "";

    res.status(200).json({
      date: today,
      title,
      explanation,
      media_type: "image",
      url: imageUrl,
      hdurl: imageUrl,
    });
  } catch (error) {
    console.error("NASA API error:", error);
    res.status(500).json({ error: "Failed to fetch NASA APOD" });
  }
}

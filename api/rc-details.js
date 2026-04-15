export default async function handler(req, res) {
  const { regNo } = req.query;

  if (!regNo) {
    return res.status(400).json({ error: "RegNo required" });
  }

  try {
    const response = await fetch(
      `https://vehicle.wuaze.com/?vehicle=${regNo}`
    );

    const text = await response.text(); // 👈 पहले text lo

    let data;

    try {
      data = JSON.parse(text); // 👈 try JSON
    } catch {
      return res.status(500).json({
        error: "API not returning JSON",
        raw: text.substring(0, 200) // थोड़ा preview
      });
    }

    const modified = {
      ...data,
      API_BY: "MYNK",
      API_SOURCE: "@mynk_mynk_mynk",
      BuyAPI: "@mynk_mynk_mynk"
    };

    return res.status(200).json(modified);

  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch data",
      message: err.message
    });
  }
}

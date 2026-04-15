export default async function handler(req, res) {
  const { regNo } = req.query;

  if (!regNo) {
    return res.status(400).json({ error: "RegNo required" });
  }

  try {
    // 🔥 New API
    const response = await fetch(
      `https://vehicle.wuaze.com/?vehicle=${regNo}`
    );

    const data = await response.json();

    // 🔥 Modify response (branding)
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

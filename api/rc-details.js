export default async function handler(req, res) {
  const { regNo, api_key } = req.query;

  // 🔥 Same validation (URL same rahe)
  if (!regNo || !api_key) {
    return res.status(400).json({
      error: "regNo and api_key required"
    });
  }

  try {
    // 🔥 Backend API change (WUAZE)
    const response = await fetch(
      `https://vehicle.wuaze.com/?vehicle=${regNo}`
    );

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({
        error: "API not returning JSON",
        preview: text.substring(0, 150)
      });
    }

    // 🔥 Same response style + branding
    const modified = {
      ...data,
      API_BY: "MYNK",
      API_SOURCE: "@mynk_mynk_mynk",
      BuyAPI: "@mynk_mynk_mynk"
    };

    return res.status(200).json(modified);

  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      message: err.message
    });
  }
}

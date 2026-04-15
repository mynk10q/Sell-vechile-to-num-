export default async function handler(req, res) {
  const { regNo, api_key } = req.query;

  if (!regNo || !api_key) {
    return res.status(400).json({
      error: "regNo and api_key required"
    });
  }

  try {
    // 🔥 New API (Subhxcosmo)
    const response = await fetch(
      `https://api.subhxcosmo.in/api?key=${api_key}&type=vehicle_num&term=${regNo}`
    );

    const data = await response.json(); // ✅ direct JSON

    // 🔥 Modify response (same style rakhna)
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

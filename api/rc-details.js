export default async function handler(req, res) {
  const { regNo, api_key } = req.query;

  if (!regNo || !api_key) {
    return res.status(400).json({
      error: "regNo and api_key required"
    });
  }

  try {
    const response = await fetch(
      `https://api.subhxcosmo.in/api?key=${api_key}&type=vehicle_num&term=${regNo}`
    );

    const data = await response.json();

    // 🔥 SAME DATA return (no change)
    return res.status(200).json({
      ...data,
      API_BY: "MYNK",
      API_SOURCE: "@mynk_mynk_mynk"
    });

  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      message: err.message
    });
  }
}

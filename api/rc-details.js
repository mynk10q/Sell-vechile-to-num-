export default async function handler(req, res) {
  const { regNo, api_key } = req.query;

  const USER_KEY = "hacker_0b3b424a";

  if (!regNo || !api_key) {
    return res.status(400).json({
      error: "regNo and api_key required"
    });
  }

  if (api_key !== USER_KEY) {
    return res.status(403).json({
      error: "Invalid API Key"
    });
  }

  try {
    const BACKEND_KEY = "VORTEX";

    const response = await fetch(
      `https://api.subhxcosmo.in/api?key=${BACKEND_KEY}&type=vehicle_num&term=${regNo}`
    );

    const data = await response.json();

    // 🔥 OWNER CHANGE
    data.owner = "https://MYNK \\n BUY INSTANT CHEAP PRICE";

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

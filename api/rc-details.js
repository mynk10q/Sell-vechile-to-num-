export default async function handler(req, res) {
  const { regNo, api_key } = req.query;

  if (!regNo) {
    return res.status(400).json({ error: "RegNo required" });
  }

  try {
    const response = await fetch(
      `http://103.138.96.157:5000/rc-details/${regNo}?api_key=${api_key}`
    );

    const data = await response.json();

    // 🔥 Modify response
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

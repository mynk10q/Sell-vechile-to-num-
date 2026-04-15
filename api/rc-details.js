export default async function handler(req, res) {
  const { regNo, api_key } = req.query;

  if (!regNo || !api_key) {
    return res.status(400).json({
      error: "regNo and api_key required"
    });
  }

  try {
    // 🔥 Original API call
    const response = await fetch(
      `http://103.138.96.157:5000/rc-details/${regNo}?api_key=${api_key}`
    );

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({
        error: "Invalid API response",
        raw: text.substring(0, 200)
      });
    }

    // 🔥 Branding (optional)
    const modified = {
      ...data,
      API_BY: "MYNK",
      SOURCE: "@mynk_mynk_mynk"
    };

    return res.status(200).json(modified);

  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      message: err.message
    });
  }
}

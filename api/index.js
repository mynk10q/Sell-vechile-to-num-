export default async function handler(req, res) {
  try {
    const { vec } = req.query;

    if (!vec) {
      return res.status(400).json({
        code: 400,
        message: "Enter vehicle number"
      });
    }

    // Original API
    const api = `https://vec-to-num-by-none-usr.vercel.app/vec/to/num/x/vec=${encodeURIComponent(vec)}`;

    const response = await fetch(api);
    const data = await response.json();

    // Change developer + telegram channel
    data.developer = "@mynk_mynk_mynk";
    data.telegram_channel = "https://t.me/mynk_mynk_mynk";

    // Remove any extra credits
    delete data.credit;
    delete data.owner;
    delete data.creator;
    delete data.by;
    delete data.author;

    // Deep clean nested objects too
    const cleanObject = (obj) => {
      if (typeof obj !== "object" || obj === null) return;

      for (const key in obj) {
        if (
          [
            "credit",
            "owner",
            "creator",
            "author",
            "by",
            "developer",
            "telegram",
            "telegram_channel"
          ].includes(key)
        ) {
          delete obj[key];
        } else {
          cleanObject(obj[key]);
        }
      }
    };

    cleanObject(data);

    // Force your own details always
    data.developer = "@mynk_mynk_mynk";
    data.telegram_channel = "https://t.me/mynk_mynk_mynk";

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: "Server Error",
      error: err.message
    });
  }
}

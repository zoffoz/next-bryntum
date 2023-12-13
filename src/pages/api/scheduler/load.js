const fs = require("node:fs");

export default async function handler(req, res) {
  if (req.method === "GET") {
    console.log("+++++++++++++ BRYNTUM ++ LOAD +++++++++++++");
    try {
      const data = fs.readFileSync("public/data/scheduler-data.json", "utf8");
      const jsonData = JSON.parse(data);

      // Simulate slow network and large processing time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      res.status(200).json(jsonData);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Failed to load ressources" });
    }
  } else {
    res.status(403).json({ success: false, message: "Forbidden" });
  }
}

const fs = require("node:fs");

export default function handler(req, res) {
  try {
    const data = fs.readFileSync("public/data/scheduler-data.json", "utf8");
    const jsonData = JSON.parse(data);

    //Add API to the ressources to prove that we go here
    jsonData.resources.rows.map(
      (ressource) => (ressource.name = `API: ${ressource.name}`)
    );
    res.status(200).json(jsonData);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to load ressources" });
  }
}

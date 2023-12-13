const fs = require("node:fs");
const crypto = require("crypto");

function generateUniqueId(length = 8) {
  return crypto.randomBytes(length).toString("hex");
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("+++++++++++++ BRYNTUM ++ SAVE +++++++++++++");
    try {
      const body = req.body;
      // console.log("body", body);
      // console.log("body.type", body.type);
      // console.log("body.requestId", body.requestId);
      console.log("data.events", body.events);

      const data = fs.readFileSync("public/data/scheduler-data.json", "utf8");
      const jsonData = JSON.parse(data);

      if (body.events) {
        if (body.events.added) {
          body.events.added.map((added) => {
            added.id = generateUniqueId();
            added.eventColor = `#${generateUniqueId(3)}`;
            added.durationUnit = "m";
            added.iconCls = "b-fa b-fa-gift";
            jsonData.events.rows.push(added);
          });
        }
        if (body.events.removed) {
          body.events.removed.map((removed) => {
            jsonData.events.rows = jsonData.events.rows.filter(
              (obj) => obj.id !== removed.id
            );
          });
        }
        if (body.events.updated) {
          let updatedEvents = [];
          body.events.updated.map((update) => {
            updatedEvents = jsonData.events.rows.map((event) =>
              event.id === update.id ? { ...event, ...update } : event
            );
          });
          jsonData.events.rows = updatedEvents;
        }
      }

      const dataToWrite = JSON.stringify(jsonData, null, 2);
      await fs.writeFileSync(
        "public/data/scheduler-data.json",
        dataToWrite,
        "utf8"
      );

      // Simulate slow network and large processing time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      res.status(200).json(jsonData);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Failed to save ressources" });
    }
  } else {
    res.status(403).json({ success: false, message: "Forbidden" });
  }
}

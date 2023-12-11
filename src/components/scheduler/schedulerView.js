import { useEffect, useState } from "react";
import MyScheduler from ".";

export default function SchedulerView() {
  const [schedulerRef, setSchedulerRef] = useState({ timeAxis: "" });

  useEffect(() => {
    var head = document.head;
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "/themes/schedulerpro.classic-dark.css";
    head.appendChild(link);
    return () => {
      head.removeChild(link);
    };
  }, []);

  function handleTimeZoneChange(tz) {
    console.log("handleTimeZoneChange", tz);
    if (schedulerRef.isDestroyed != true && schedulerRef.project) {
      schedulerRef.timeZone = tz;
    }
  }

  function handleReload() {
    if (schedulerRef.isDestroyed != true && schedulerRef.project) {
      console.log("loadDataAsync");
      schedulerRef.project.eventStore.loadDataAsync();
    }
  }

  function schedulerRefFn(value) {
    setSchedulerRef(value);
    //once we have the bryntum reference we can inject the correct params and reload the data
  }

  return (
    <>
      <div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <h3>Scheduler View</h3>

          <button onClick={() => handleTimeZoneChange("UTC")}>
            Set to UTC
          </button>
          <button onClick={() => handleTimeZoneChange("America/New_York")}>
            Set to New York
          </button>
          <button onClick={() => handleTimeZoneChange("America/Denver")}>
            Set to Denver
          </button>
          <button onClick={() => handleReload()}>Reload</button>
        </div>
        <div>
          <MyScheduler schedulerRef={schedulerRefFn} />
        </div>
      </div>
    </>
  );
}

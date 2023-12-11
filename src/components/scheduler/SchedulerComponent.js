import { BryntumScheduler } from "@bryntum/scheduler-react";
import { useEffect, useRef } from "react";
import { schedulerConfig } from "./SchedulerConfig";

export default function SchedulerComponent({ schedulerRef }) {
  const schedulerComponentRef = useRef();

  useEffect(() => {
    schedulerRef(schedulerComponentRef.current?.instance);
    // we do not want schedulerRef to be part of the dependance
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedulerComponentRef]);

  return (
    <div
      style={{
        width: "100%",
        height: "40rem",
        backgroundColor: "#BBBBFF20",
        padding: "1rem",
        borderRadius: "1rem",
        marginTop: "1rem",
      }}
    >
      <BryntumScheduler ref={schedulerComponentRef} {...schedulerConfig} />
    </div>
  );
}

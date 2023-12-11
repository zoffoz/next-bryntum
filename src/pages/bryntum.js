import SchedulerView from "@/components/scheduler/schedulerView";

export default function BryntumPage() {
  return (
    <div
      style={{
        width: "calc(100vw - 2rem)",
        height: "calc(100vh - 2rem)",
        backgroundColor: "#333",
        margin: "1rem",
        padding: "1rem",
        borderRadius: "1rem",
      }}
    >
      <SchedulerView />
    </div>
  );
}

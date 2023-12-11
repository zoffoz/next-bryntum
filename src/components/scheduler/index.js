import dynamic from "next/dynamic";

//turn of Next Server Side Rendering
const MyScheduler = dynamic(() => import("./SchedulerComponent"), {
  ssr: false,
});

export default MyScheduler;

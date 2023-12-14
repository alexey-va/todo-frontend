import TaskList from "./TaskList.jsx";
import { tasksNew } from "../../Signals.jsx";
import { changeComplete, getAddList } from "../../myutils/Utils.jsx";

export default function BiggieToday() {


  return (
    <div className="relative flex h-full flex-col px-4">
      <div className="flex flex-row items-center gap-4 pb-2 text-[1.75rem] font-semibold">
        <div className="">Today</div>
        <div
          className="flex aspect-square translate-y-[0.15rem] items-center justify-center overflow-hidden rounded-md
         border hover:animate-ping"
        >
          <div className="px-[0.55rem] text-[1.0rem] opacity-70">
            {tasksNew.value.today > 0 ? tasksNew.value.today : ""}
          </div>
        </div>
      </div>
      <div className="grid grid-rows-1 grid-cols-1 h-full w-full no-scrollbar gap-4">
        <TaskList changeComplete={changeComplete} getAddList={getAddList} predicate={(value) => value.upcoming === 0}/>
      </div>
    </div>
  );
}

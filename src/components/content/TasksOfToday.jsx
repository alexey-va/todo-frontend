import Tasks from "./Tasks.jsx";
import { tasksNew } from "../../Signals.jsx";
import { changeComplete, getAddList, sameDay } from "../../myutils/Utils.jsx";
import NewCounter from "../other/NewCounter.jsx";

export default function TasksOfToday() {


  return (
    <div className="relative flex h-full flex-col px-4 max-sm:px-2">
      <div className="flex flex-row items-center gap-4 pb-2 text-[1.75rem] font-semibold">
        <div className="">Today</div>
        <NewCounter
          count={tasksNew.value.today}
          width="25px"
          fontSize="1rem"
        />
      </div>
      <div className="grid grid-rows-1 grid-cols-1 h-full w-full no-scrollbar gap-4">
        <Tasks changeComplete={changeComplete} getAddList={getAddList} predicate={(value) => sameDay(new Date(), new Date(value.startDate))}/>
      </div>
    </div>
  );
}

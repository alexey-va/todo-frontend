import Tasks from "./Tasks.jsx";
import { tasksNew } from "../../Signals.jsx";
import { changeComplete, getAddList, isForToday, sameDay } from "../../Utils.jsx";
import NewCounter from "../other/NewCounter.jsx";

export default function TasksOfToday() {


  return (
    <div className="relative flex h-full flex-col px-4 pb-4 max-sm:px-2">
      <div className="flex flex-row items-center gap-4 pb-2 text-[1.75rem] font-semibold">
        <div className="">Today</div>
        <NewCounter count={tasksNew.value.today} width="25px" fontSize="1rem" />
      </div>
      <div className="no-scrollbar grid h-full w-full grid-cols-1 grid-rows-1 gap-4">
        <Tasks
          changeComplete={changeComplete}
          getAddList={getAddList}
          predicate={(value) => isForToday(value)}
          taskContainer="today_container_single"
          title="Today"
        />
      </div>
    </div>
  );
}

import { lists, listsNew, tasksNew } from "../../Signals.jsx";

import Tasks from "./Tasks.jsx";
import NewCounter from "../other/NewCounter.jsx";
import { changeComplete, getAddList } from "../../myutils/Utils.jsx";

export default function TasksOfList({ listId }) {


  let list = lists.value.find(i => i.id === listId)
  //console.log(typeof lists.value)
  if(list === null || list == undefined) list = []


  return (
    <div className="relative flex h-full flex-col px-4 max-sm:px-2">
      <div className="flex h-[8%] flex-row items-center gap-4 pb-2 text-[1.75rem] font-semibold">
        <div className="">{list.title ? list.title : "Error in name"}</div>

        {tasksNew.value.upcoming > 0 ? (
          <NewCounter
            count={listsNew.value[listId]}
            width="25px"
            fontSize="1rem"
          />
        ) : (
          ""
        )}
      </div>
      <div className="no-scrollbar grid h-[92%] w-full grid-cols-1 grid-rows-1 gap-4">
        <Tasks
          changeComplete={changeComplete}
          getAddList={getAddList}
          predicate={(value) => value.list === list.id}
        />
      </div>
    </div>
  );
}
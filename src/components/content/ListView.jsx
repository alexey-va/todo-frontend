import { lists, listsNew, tasksNew } from "../../Signals.jsx";

import TaskList from "./TaskList.jsx";
import Counter from "../other/Counter.jsx";
import { changeComplete, getAddList } from "../../myutils/Utils.jsx";

export default function ListView({ listId }) {

  let list = lists.value.find(i => i.id === listId)
  if(list === null) return <>Error</>;

  return (
    <div className="relative flex h-full flex-col px-4">
      <div className="flex h-[8%] flex-row items-center gap-4 pb-2 text-[1.75rem] font-semibold">
        <div className="">{list.name}</div>

        {tasksNew.value.upcoming > 0 ? (
          <Counter
            count={listsNew.value[listId]}
            width="25px"
            fontSize="1rem"
          />
        ) : (
          ""
        )}
      </div>
      <div className="no-scrollbar grid h-[92%] w-full grid-cols-1 grid-rows-1 gap-4">
        <TaskList
          changeComplete={changeComplete}
          getAddList={getAddList}
          predicate={(value) => value.list === list.id}
        />
      </div>
    </div>
  );
}
import {tasksNew } from "../../Signals.jsx";
import Tasks from "./Tasks.jsx";
import NewCounter from "../other/NewCounter.jsx";
import { changeComplete, getAddList } from "../../myutils/Utils.jsx";

export default function TasksUpcoming() {

  let seen = [false, false, false];

  return (
    <>
      <div className="relative flex h-full flex-col px-4">
        <div className="flex h-[8%] flex-row items-center gap-4 pb-2 text-[1.75rem] font-semibold">
          <div className="">Upcoming</div>
          {tasksNew.value.upcoming > 0 ? (
            <NewCounter
              count={tasksNew.value.upcoming}
              width="25px"
              fontSize="1rem"
            />
          ) : (
            ""
          )}
        </div>
        <div
          className="no-scrollbar grid h-[92%] overflow-clip max-sm:overflow-y-scroll grid-cols-2
           grid-rows-[fit-content(40%)_minmax(60%,auto)] gap-4 max-sm:flex max-sm:flex-col"
        >
          {/*TODAY*/}
          <div className="col-span-full">
            <Tasks
              changeComplete={changeComplete}
              seen={seen}
              getAddList={getAddList}
              predicate={(value) => value.upcoming === 0}
              title="Today"
            />
          </div>

          <div className="col-span-full flex w-full flex-row justify-between gap-4 max-sm:flex-col">
            <div className="w-full grow-0 basis-[50%]">
              {/*Tomorrow*/}
              <Tasks
                changeComplete={changeComplete}
                seen={seen}
                getAddList={getAddList}
                predicate={(value) => value.upcoming === 1}
                title="Tomorrow"
              />
            </div>
            <div className="w-full grow-0 basis-[50%]">
              {/*Next Week*/}
              <Tasks
                changeComplete={changeComplete}
                seen={seen}
                getAddList={getAddList}
                predicate={(value) => value.upcoming === 2}
                title="This Week"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
